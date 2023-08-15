'use strict';

require('dotenv').config();
const express = require('express');
const path = require('path');

const shutdown = require('./src/shutdown');
const homepageRouter = require('./src/routers/homepage/homepage');
const chatRouter = require('./src/routers/chat/chat');
const wsRouter = require('./src/routers/ws/ws');

const app = express();

const port = process.env.PORT || 80;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));
app.use(express.json());
app.use(homepageRouter);
app.use(chatRouter);
wsRouter(app);


const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log('Use, for example: http://localhost:80');
});

shutdown(server);