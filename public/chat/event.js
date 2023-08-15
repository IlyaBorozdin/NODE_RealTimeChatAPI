class Event {
    constructor(ws) {
        this.ws = ws;
    }
    
    static name() {
        return 'event';
    }

    handler(data) {
        throw new Error('Should be implemented.');
    }
}
