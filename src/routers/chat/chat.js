const express = require('express');
const path = require('path');
const appRoot = require('app-root-path');

const getHandler = require('./get');

const publicDir = path.join(appRoot.toString(), 'public');
const chatRouter = express.Router();

chatRouter.use(express.static(publicDir));
chatRouter.get('/:room', getHandler);

module.exports = chatRouter;