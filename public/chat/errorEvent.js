class ErrorEvent extends Event {
    constructor(ws) {
        super(ws);
    }

    static name() {
        return 'error';
    }

    handler(data) {
        console.error(data);
    }
}