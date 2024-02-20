// Servidor de Express
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const cors = require('cors');
const moment = require('moment');
moment.locale('es');
const Sockets = require('./sockets');
const { dbConnection } = require('./database');

class Server {
	constructor() {
		this.app = express();
		this.app.use(express.json({ limit: '50mb' }));
		this.app.use(express.urlencoded({ limit: '50mb' }));
		this.port = process.env.PORT;

		// Connect to DB
		dbConnection();

		// Http server
		this.server = http.createServer(this.app);

		// Sockets config
		this.io = socketio(this.server, {
			cors: {
				origin: '*',
				methods: ['GET', 'POST', 'PUT']
			}
		});
	}

	middlewares() {
		// Deploy public folder
		this.app.use(express.static(path.resolve(__dirname, '../public')));

		// CORS
		this.app.use(cors());

		// Body Parse
		this.app.use(express.json());

		// API End Points
		this.app.use('/api/auth', require('../modules/auth/urls'));
		this.app.use('/api/account', require('../modules/account/urls'));
		this.app.use('/api/control', require('../modules/control/urls'));
		this.app.use('/api/common', require('../modules/common/urls'));
		this.app.use('/api/public', require('../modules/control/public-urls'));
		this.app.use('/api/setup', require('../modules/setup/urls'));

		this.app.use('*', (req, res) => {
			res.sendFile(path.resolve(__dirname, '../public/index.html'));
		});
	}

	configurarSockets() {
		new Sockets(this.io);
	}

	execute() {
		// Initiliaze middlewares
		this.middlewares();

		// Initialize sockets
		this.configurarSockets();

		// Initialize server
		this.server.listen(this.port, () => {
			console.log('Server running on port:', this.port);
		});
	}
}

module.exports = Server;
