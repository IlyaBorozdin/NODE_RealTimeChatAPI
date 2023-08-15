const Message = require('../../../services/message');
const Room = require('../../../services/room');
const User = require('../../../services/user');
const Event = require('./event');

class JoinEvent extends Event {
    constructor(ws, wsInstance) {
        super(ws, wsInstance);
    }

    static name() {
        return 'join';
    }

    handler(data) {
        const user = new User(data.user);
        const room = new Room(data.room);
        const res = { event: 'joined', data: {} };

        Promise.all([
            user.addUser(),
            room.addRoom()
        ])
            .then(([userId, roomId]) => {
                this.ws.user = user.name;
                this.ws.room = room.name;
                this.ws.userId = userId;
                this.ws.roomId = roomId;

                res.data.userId = userId;
                res.data.roomId = roomId;

                const message = new Message({ type: 'join' });
                return message.addMessage(userId, roomId);
            })
            .then((messageId) => {
                this.boadcastAvoid(JSON.stringify({
                    event: 'message',
                    data: {
                        name: user.name,
                        type: 'join'
                    }
                }), this.ws.roomId);
                return Message.readMessages(res.data.roomId);
            })
            .then((data) => {
                res.data.text = data;
                this.ws.send(JSON.stringify(res));
                return;
            })
            .catch ((err) => {
                console.error(err);
                this.ws.send(JSON.stringify({
                    event: 'error',
                    data: {
                        message: 'Error while joining'
                    }
                }));
            });
    }
}

module.exports = JoinEvent;