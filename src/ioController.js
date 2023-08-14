const { Server } = require('socket.io');

function ioController(server) {

    const io = new Server(server);

    io.on('connection', (socket) => {

        setInterval(() => {
            const rooms = io.sockets.adapter.rooms;
        
            for (const room in rooms) {
                if (rooms[room]?.length === 0) {
                    delete rooms[room];
                }
            }
        }, 5 * 60 * 1000);

        socket.on('new-user', (room, name) => {
            socket.join(room);
            io.to(room).emit('new-user', name);
        });

        socket.on('left-user', (room, name) => {
            io.to(room).emit('left-user', name);
        });

        socket.on('message', (room, name, message) => {
            io.to(room).emit('message', { message: message, name: name, id: socket.id });
        });
    });
}

module.exports = ioController;