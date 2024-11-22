const express = require('express');
const uuid = require('uuid');
const app = express();

// The subscribers and users are saved in memory and disappear whenever the service is restarted.
let users = {};
let subscribers = [];

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
  const user = users[req.body.username];
  if (user) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = { username: req.body.username, password: req.body.password, token: uuid.v4() };
    users[user.username] = user;

    res.send({ token: user.token });
  }
});

// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
  const user = users[req.body.username];
  if (user) {
    if (req.body.password === user.password) {
      user.token = uuid.v4();
      res.send({ token: user.token });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth logout a user
apiRouter.delete('/auth/logout', (req, res) => {
  const user = Object.values(users).find((u) => u.token === req.body.token);
  if (user) {
    delete user.token;
  }
  res.status(204).end();
});

// GetSubscribers
apiRouter.get('/subscribers', (_req, res) => {
  res.send(subscribers);
});

// SubmitScore
apiRouter.post('/newSubscriber', (req, res) => {
  subscribers = updateSubs(req.body, subscribers);
  res.send(subscribers);
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

//CHANGE THIS FUNCTION??? Could probably combine with users?
// updateSubs considers a new value for updating the subscriber count.
function updateSubs(newSub, subscribers) {
  let found = false;
  for (const [i, prevSubCount] of subscribers.entries()) {
    if (newSub.sub > prevSubCount.sub) {
      subscribers.splice(i, 0, newSub);
      found = true;
      break;
    }
  }

  if (!found) {
    subscribers.push(newSub);
  }

  // if (subscribers.length > 10) {
  //   subscribers.length = 10;
  // }

  return subscribers;
}