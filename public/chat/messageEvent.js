class MessageEvent extends Event {
    constructor(ws) {
        super(ws);
    }
    
    static name() {
        return 'message';
    }

    handler(data) {
        addMessage(data, this.ws.user);
    }
}