const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 3000;

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/',(req,res) =>{
    res.sendFile(__dirname + '/public/index.html');
});

var nodeSpace = io.of('/nodeJs');

nodeSpace.on('connection', (socket) =>{
    socket.on('join',(data)=>{
        socket.join(data.room);
        nodeSpace.in(data.room).emit('message',`New user just joined to the room : ${data.room}`);
    });
    socket.on('msg',(data)=>{
        console.log(`message is ${data.message}`);
        nodeSpace.in(data.room).emit('msg',data.message);
    });
    socket.on('disconnect', () => {
        nodeSpace.emit('msg','user disconnected');
    });
});
