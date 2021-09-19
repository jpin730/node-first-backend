'use strict';

const Project = require('../models/project');

const controller = {
  getProject: (req, res) => {
    const { id } = req.params;

    console.log(id);

    Project.findById(id, (err, project) => {
      if (err) {
        return res.status(500).send('Error');
      }

      if (!project) {
        res.status(404).send();
        return;
      }

      return res.status(200).send(project);
    });
  },

  getProjects: (req, res) => {
    Project.find().exec((err, projects) => {
      if (err) {
        return res.status(500).send('Error');
      }

      if (!projects) {
        res.status(404).send();
        return;
      }

      return res.status(200).send(projects);
    });
  },

  postProject: (req, res) => {
    const { name, description, category, year, langs } = req.body;

    if (!name || !description || !category || !year || !langs) {
      res.status(400).send();
      return;
    }

    const project = new Project({ name, description, category, year, langs });

    project.save((err, projectStored) => {
      if (err) {
        return res.status(500).send('Error');
      }

      if (!projectStored) {
        return res.status(500).send('Not stored');
      }

      return res.status(201).send(projectStored);
    });
  },
};

module.exports = controller;
