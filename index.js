const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 3000;

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/php', (req, res) => {
    res.sendFile(__dirname + '/public/php.html');
});

app.get('/java', (req, res) => {
    res.sendFile(__dirname + '/public/php.html');
});


var nodeSpace = io.of('/nodeJs');

nodeSpace.on('connection', (socket) => {
    socket.on('join', (data) => {
        socket.join(data);
        nodeSpace.in(data).emit('room', `New user just joined to the room : ${data}`);
    });
    socket.on('msg1', (data) => {
        console.log(`message is ${data.msg}`);
        nodeSpace.in(data.space.room).emit('messageInput', data.msg);
    });
    socket.on('disconnect', () => {
        nodeSpace.emit('messageInput', 'user disconnected');
    });
});
