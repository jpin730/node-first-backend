'use strict';

const express = require('express');
const projectController = require('../controllers/project.controller');

const router = express.Router();

router.get('/projects/:id', projectController.getProject);
router.get('/projects/', projectController.getProjects);
router.post('/projects', projectController.postProject);
router.put('/projects/:id', projectController.putProject);
router.delete('/projects/:id', projectController.deleteProject);

module.exports = router;
