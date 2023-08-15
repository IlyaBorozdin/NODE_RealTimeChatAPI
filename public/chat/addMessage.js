const messageContainer = document.querySelector('#message-container');

function addMessage(message, currentUser) {
    const write = (text, type) => {
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

    if (message.type === 'join') {
        write(`Welcome, ${message.name}!`, 'center');
    }
    else if (message.type === 'left') {
        write(`${message.name} leaves chat.`, 'center');
    }
    else if (message.type === 'message') {
        if (message.name === currentUser) {
            write(message.text, 'right');
        }
        else {
            write(`${message.name}: ${message.text}`, 'left');
        }
    }
}
