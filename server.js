'use strict';

require('dotenv').config();
const express = require('express');
const http = require('http');
const path = require('path');

const ioController = require('./src/ioController');
const shutdown = require('./src/shutdown');
const homepageRouter = require('./src/routers/homepage/homepage');

const app = express();
const server = http.createServer(app);

const port = process.env.PORT || 80;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));
app.use(express.json());
app.use(homepageRouter);

ioController(server);
shutdown(server);

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log('Use, for example: http://localhost:80/myRoom');
});