'use strict';

const express = require('express');
const projectController = require('../controllers/project');

const router = express.Router();

router.post('/projects', projectController.postProject);

module.exports = router;
