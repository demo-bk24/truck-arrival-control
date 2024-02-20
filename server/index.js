// Server Model
const Server = require('./config/server');

// Package to read .env
require('dotenv').config();

// Initialize Server
const server = new Server();

// Execute server
server.execute();
