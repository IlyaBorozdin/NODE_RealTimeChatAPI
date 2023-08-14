const express = require('express');
const path = require('path');
const appRoot = require('app-root-path');

const getHandler = require('./get');

const publicDir = path.join(appRoot.toString(), 'public');
const homepageRouter = express.Router();

homepageRouter.use(express.static(publicDir));
homepageRouter.get('/', getHandler(path.join(publicDir, 'home.html')));

module.exports = homepageRouter;