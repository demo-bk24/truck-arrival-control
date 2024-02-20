class Sockets {
	constructor(io) {
		this.io = io;
		this.listenSocket();
	}

	listenSocket() {
		console.log('Listen Sockets');
		this.io.on('connection', async (socket) => {
			console.log('Client connected');

			socket.on('hello', () => {
				this.io.emit('hello2', 'Hello world');
			});

			socket.on('work-lift', () => {
				this.io.emit('to-work', 'Work');
			});

			socket.on('picking', () => {
				this.io.emit('to-picking', 'Picking');
			});

			socket.on('productivity-sorting', () => {
				this.io.emit('to-productivity-sorting', 'Sorting');
			});

			socket.on('productivity-picking', () => {
				this.io.emit('to-productivity-picking', 'Picking');
			});

			socket.on('disconnect', () => {
				console.log('Client disconnected');
			});
		});
	}
}

module.exports = Sockets;
