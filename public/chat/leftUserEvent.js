class LeftUserdEvent extends Event {
    constructor(ws) {
        super(ws);
    }
    
    static name() {
        return 'left';
    }

    handler(data) {
        this.ws.close(1000, 'User logged out');
        window.location.href = 'http://localhost:80';
    }
}