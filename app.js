'use strict';

const express = require('express');

const app = express();

// middleware

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes

app.get('/', (req, res) => {
  res.status(200).send({
    message: 'Hello world',
  });
});

module.exports = app;
