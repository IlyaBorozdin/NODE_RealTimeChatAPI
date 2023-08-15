const express = require('express');
const path = require('path');
const appRoot = require('app-root-path');

const getHome = require('./getHome');

const publicDir = path.join(appRoot.toString(), 'public');
const homepageRouter = express.Router();

homepageRouter.use(express.static(publicDir));
homepageRouter.use(express.static(path.join(publicDir, 'home')));
homepageRouter.get('/', getHome(path.join(publicDir, 'home', 'home.html')));

module.exports = homepageRouter;