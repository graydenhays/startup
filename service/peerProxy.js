const { WebSocketServer } = require('ws');
const uuid = require('uuid');
const DB = require('./database.js');

function peerProxy(httpServer) {
  // Create a websocket object
  const wss = new WebSocketServer({ noServer: true });

  // Handle the protocol upgrade from HTTP to WebSocket
  httpServer.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, function done(ws) {
      wss.emit('connection', ws, request);
    });
  });

  // Keep track of all the connections so we can forward messages
  let connections = [];

  wss.on('connection', (ws) => {
    const connection = { id: uuid.v4(), alive: true, ws: ws };
    connections.push(connection);

    // Forward messages to everyone except the sender
    ws.on('message', async function message(data) {
      const event = JSON.parse(data);

      // Handle subscriber count request
      if (event.type === 'subscriberUpdate' && event.value.action === 'request') {
        const count = await DB.getSubscriberCount();
        ws.send(JSON.stringify({ type: 'subscriberUpdate', value: { count } }));
      }

      // Handle subscribe event
      if (event.type === 'subscribe') {
        const newCount = await DB.getSubscriberCount();
        broadcastToAllClients({ type: 'subscriberUpdate', value: { count: newCount } });
      }

      // Handle unsubscribe event
      if (event.type === 'unsubscribe') {
        const newCount = await DB.getSubscriberCount();
        broadcastToAllClients({ type: 'subscriberUpdate', value: { count: newCount } });
      }

      connections.forEach((c) => {
        if (c.id !== connection.id) {
          c.ws.send(data);
        }
      });
    });

    // Remove the closed connection so we don't try to forward anymore
    ws.on('close', () => {
      const pos = connections.findIndex((o, i) => o.id === connection.id);

      if (pos >= 0) {
        connections.splice(pos, 1);
      }
    });

    // Respond to pong messages by marking the connection alive
    ws.on('pong', () => {
      connection.alive = true;
    });
  });

  // Keep active connections alive
  setInterval(() => {
    connections.forEach((c) => {
      // Kill any connection that didn't respond to the ping last time
      if (!c.alive) {
        c.ws.terminate();
      } else {
        c.alive = false;
        c.ws.ping();
      }
    });
  }, 10000);

  function broadcastToAllClients(message) {
    connections.forEach((c) => {
      c.ws.send(JSON.stringify(message));
    });
  }
}

module.exports = { peerProxy };
