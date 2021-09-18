'use strict';

const express = require('express');
const projectController = require('../controllers/project');

const router = express.Router();

router.get('/home', projectController.home);

module.exports = router;
