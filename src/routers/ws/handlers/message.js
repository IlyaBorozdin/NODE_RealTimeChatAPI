const Message = require('../../../services/message');
const Event = require('./event');

class MessageEvent extends Event {
    constructor(ws, wsInstance) {
        super(ws, wsInstance);
    }

    static name() {
        return 'message';
    }

    handler(data) {
        const message = new Message(data);

        message.addMessage(this.ws.userId, this.ws.roomId)
            .then((messageId) => {
                this.boadcast(JSON.stringify({
                    event: 'message',
                    data: data
                }), this.ws.roomId);
            })
            .catch ((err) => {
                console.error(err);
                this.ws.send(JSON.stringify({
                    event: 'error',
                    data: {
                        message: 'Error while chating'
                    }
                }));
            });
    }
}

module.exports = MessageEvent;