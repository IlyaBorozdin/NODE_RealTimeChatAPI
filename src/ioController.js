const { Server } = require('socket.io');

function ioController(server) {

    const io = new Server(server);

    io.on('connection', (socket) => {

        socket.on('new-user', (room, name) => {
            socket.join(room);
            io.to(room).emit('new-user', name);
        });

        socket.on('left-user', (room, name) => {
            socket.leave(room);
            io.to(room).emit('left-user', name);
        });

        socket.on('message', (room, name, message) => {
            io.to(room).emit('message', { message: message, name: name, id: socket.id });
        });
    });
}

module.exports = ioController;