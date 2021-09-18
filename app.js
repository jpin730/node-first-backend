'use strict';

const express = require('express');

const app = express();

// routers

const projectRouter = require('./routes/project');

// middleware

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes

app.use('/api', projectRouter);

module.exports = app;
