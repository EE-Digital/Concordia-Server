let clients = 0;
module.exports = (io) => {

    io.on('connection', (socket) => {
        clients++;
        console.log(`A client connected ${clients}`);

        // Listen for messages from a client
        socket.on('message', (data) => {
            // Broadcast the message to all clients
            io.emit('update', data);
        });

        socket.on('disconnect', () => {
            console.log(`A client disconnected ${clients}`);
            clients--;
        });
    });

}