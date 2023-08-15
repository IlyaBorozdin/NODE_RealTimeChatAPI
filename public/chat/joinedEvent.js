class JoinedEvent extends Event {
    constructor(ws) {
        super(ws);
    }
    
    static name() {
        return 'joined';
    }

    handler(data) {
        this.ws.userId = data.userId;
        this.ws.roomId = data.roomId;

        data.text.forEach(addMessage, this.ws.user);
    }
}