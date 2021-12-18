const express = require('express');
const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.use(express.static('static'))

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/static/main.html');
});

io.on('connection', (socket) => {
	socket.on('msg', (msg, room) => {
		socket.to(room).emit('msg', msg, room);
	});
	socket.on('join', (room) => {
		socket.join(room)
	})
});

http.listen(port, () => {
	console.log(`Server running at http://localhost:${port}/!`);
});
