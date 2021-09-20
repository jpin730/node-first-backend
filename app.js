'use strict';

const express = require('express');
const cors = require('cors');

const app = express();

// routers

const projectRouter = require('./routes/project.router');

// middleware

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// CORS config

app.use(cors());

// routes

app.use('/api', projectRouter);

module.exports = app;
