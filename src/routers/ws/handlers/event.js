class Event {
    constructor(ws, wsInstance) {
        this.ws = ws;
        this.wsInstance = wsInstance;
    }

    static name() {
        return 'event';
    }

    handler(data) {
        throw new Error('Should be implemented.');
    }

    boadcast(clienMessage, roomId) {
        this.wsInstance.getWss().clients.forEach((client) => {
            if (client.readyState === 1 && client.roomId === roomId) {
                client.send(clienMessage);
            }
        });
    }

    boadcastAvoid(clienMessage, roomId) {
        this.wsInstance.getWss().clients.forEach((client) => {
            if (client !== this.ws && client.readyState === 1 && client.roomId === roomId) {
                client.send(clienMessage);
            }
        });
    }
}

module.exports = Event;