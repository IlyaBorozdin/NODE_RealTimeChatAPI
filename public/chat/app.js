document.addEventListener('DOMContentLoaded', () => {
    const user = document.querySelector('#name').innerHTML;
    const room = document.querySelector('#room').innerHTML;

    const sendButton = document.querySelector('#send-button');
    const exitButton = document.querySelector('#exit-button');
    const messageInput = document.querySelector('#message-input');

    const ws = new WebSocket('ws://localhost:80/chat');

    ws.user = user;
    ws.room = room;
    
    ws.onopen = () => {
        ws.send(JSON.stringify({
            event: 'join',
            data: {
                user: {
                    name: user
                },
                room: {
                    name: room
                }
            }
        }));

        sendButton.addEventListener('click', () => {
            const message = messageInput.value.trim();

            if (message.length > 0) {
                messageInput.value = '';
                
                ws.send(JSON.stringify({
                    event: 'message',
                    data: {
                        name: ws.user,
                        text: message,
                        type: 'message'
                    }
                }));
            }
        });

        exitButton.addEventListener('click', () => {
            ws.send(JSON.stringify({
                event: 'left',
                data: {
                    message: 'The client should be disconnected'
                }
            }));
        });
    };

    ws.onmessage = (msg) => {
        const message = JSON.parse(msg.data);
        const event = new mapEvent[message.event](ws);
        event.handler(message.data);
    };
});