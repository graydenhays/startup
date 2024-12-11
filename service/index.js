const express = require('express');
// const uuid = require('uuid');
const app = express();
const DB = require('./database.js');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');

// The subscribers and users are saved in memory and disappear whenever the service is restarted.
// let users = {};
// let subscribers = {"numSubs": 1};
const authCookieName = 'token';

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

app.use(cookieParser());
app.use(express.static('public'));
app.set('trust proxy', true);

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
  if (await DB.getUser(req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await DB.createUser(req.body.email, req.body.password);
    // Set the cookie
    setAuthCookie(res, user.token);
    await DB.incrementSubscribers();
    res.send({
      id: user._id,
    });
  }
});

// GetAuth token for the provided credentials
apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUser(req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth token if stored in cookie
apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// secureApiRouter verifies credentials for endpoints
const secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  const authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});


// GetSubscribers
secureApiRouter.get('/subscribers', async (_req, res) => {
  console.log("In Subscribers");
  const subscribers = await DB.getSubscriberCount();
  // res.send(subscribers);
  res.json({ count: subscribers });
});

// newSubscriber
secureApiRouter.post('/newSubscriber', async (req, res) => {
  const successfulAdd = await DB.incrementSubscribers();
  // subscribers.numSubs += 1;
  res.send(successfulAdd);
});

// removeSubscriber
secureApiRouter.post('/removeSubscriber', async (req, res) => {
  const successfulRemove = await DB.decrementSubscribers();
  res.send(successfulRemove);
});

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Serve up the front-end static content hosting
app.use(express.static('public'));

app.use((req, res) => {
  if (req.path.startsWith('/api')) {
    res.status(404).send({ error: 'Not Found' });
  } else {
    res.sendFile('index.html', { root: 'public' });
  }
});

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});