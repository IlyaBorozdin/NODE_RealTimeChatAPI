const expressWs = require('express-ws');

const mapEvent = require('./handlers/mapEvent');

function wsRouter(app) {
    const wsInstance = expressWs(app);

    app.ws('/chat', (ws, req) => {
        
        ws.on('message', (msg) => {
            const message = JSON.parse(msg);
            const event = new mapEvent[message.event](ws, wsInstance);
            event.handler(message.data);
        });

        ws.on('close', (code, reason) => {
            console.log(`Client disconnected with code ${code} and reason: ${reason}`);
          });
    });
}

module.exports = wsRouter;