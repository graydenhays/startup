const SubscriberEvent = {
  System: 'system',
  CountUpdate: 'subscriberUpdate',
  Subscribe: 'subscribe',
  Unsubscribe: 'unsubscribe',
};

class EventMessage {
  constructor(type, value) {
    this.type = type;
    this.value = value;
  }
}

class SubscriberNotifier {
  handlers = [];

  constructor() {
    let port = window.location.port;
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
    this.socket.onopen = () => {
      this.notifyHandlers(new EventMessage(SubscriberEvent.System, { msg: 'connected' }));
    };
    this.socket.onclose = (event) => {
      this.notifyHandlers(new EventMessage(SubscriberEvent.System, { msg: 'disconnected' }));
    };
    this.socket.onmessage = async (msg) => {
      try {
        const event = JSON.parse(await msg.data.text());
        this.notifyHandlers(event);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };
  }

  broadcastEvent(type, value) {
    const event = new EventMessage(type, value);
    this.socket.send(JSON.stringify(event));
  }

  addHandler(handler) {
    this.handlers.push(handler);
  }

  removeHandler(handler) {
    this.handlers.filter((h) => h !== handler);
  }

  notifyHandlers(event) {
    this.handlers.forEach((handler) => {
      handler(event);
    });
  }

  getSubscriberCount() {
    this.broadcastEvent(SubscriberEvent.CountUpdate, {action: 'request'});
  }

  notifySubscribe() {
    this.broadcastEvent(SubscriberEvent.Subscribe, {});
  }

  notifyUnsubscribe() {
    this.broadcastEvent(SubscriberEvent.Unsubscribe, {});
  }
}

const SubNotifier = new SubscriberNotifier();
export { SubscriberEvent, SubNotifier };
