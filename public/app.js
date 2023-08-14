document.addEventListener('DOMContentLoaded', () => {
    const joinButton = document.querySelector('#join-button');
    const sendButton = document.querySelector('#send-button');

    const messageContainer = document.querySelector('#message-container');
    const messageInputContainer = document.querySelector('#message-input-container');
    const nicknameInput = document.querySelector('#nickname-input');
    const messageInput = document.querySelector('#message-input');

    const room = document.querySelector('#room').innerHTML;
    let name;

    const socket = io();

    messageInput.addEventListener('input', () => {
        messageInput.style.height = 'auto';
        messageInput.style.height = messageInput.scrollHeight + 'px';
    });

    joinButton.addEventListener('click', (event) => {
        messageInputContainer.style.display = 'flex';
        joinButton.disabled = true;
        nicknameInput.readOnly = true;
        name = nicknameInput.value;
        socket.emit('new-user', room, name);
    });

    sendButton.addEventListener('click', (event) => {
        const message = messageInput.value.trim();
        if (message.length > 0) {
            messageInput.value = '';
            socket.emit('message', room, name, message);
        }
    });

    socket.on('message', ({ message, name, id }) => {
        if (id === socket.id) {
            addMessage(message, 'right');
            return;
        }
        addMessage(`${name}: ${message}`, 'left');
    });

    socket.on('new-user', (name) => {
        addMessage(`Welcome, ${name}!`, 'center');
    });

    function addMessage(text, type) {
        const messageElement = document.createElement('div');
        switch (type) {
            case 'center':
                messageElement.classList.add('message-center');
                break;
            case 'left':
                messageElement.classList.add('message');
                break;
            case 'right':
                messageElement.classList.add('your-message');
                break;
            default:
                return;
        }
        messageElement.textContent = text;
        messageContainer.appendChild(messageElement);
    }
});