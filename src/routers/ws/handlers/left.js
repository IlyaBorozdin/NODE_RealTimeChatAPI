const Message = require('../../../services/message');
const Event = require('./event');

class LeftEvent extends Event {
    constructor(ws, wsInstance) {
        super(ws, wsInstance);
    }

    static name() {
        return 'left';
    }

    handler(data) {
        const message = new Message({ type: 'left' });

        message.addMessage(this.ws.userId, this.ws.roomId)
            .then((messageId) => {
                this.boadcastAvoid(JSON.stringify({
                    event: 'message',
                    data: {
                        name: this.ws.user,
                        type: 'left'
                    }
                }), this.ws.roomId);
                this.ws.send(JSON.stringify({
                    event: 'left',
                    data: {
                        message: 'The client can be disconnected'
                    }
                }));
            })
            .catch ((err) => {
                console.error(err);
                this.ws.send(JSON.stringify({
                    event: 'error',
                    data: {
                        message: 'Error while leaving'
                    }
                }));
            });
    }
}

module.exports = LeftEvent;