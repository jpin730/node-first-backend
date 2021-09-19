'use strict';

const express = require('express');
const projectController = require('../controllers/project');

const router = express.Router();

router.get('/projects/:id', projectController.getProject);
router.get('/projects/', projectController.getProjects);
router.post('/projects', projectController.postProject);

module.exports = router;