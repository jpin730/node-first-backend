'use strict';

const Project = require('../models/project');

const controller = {
  postProject: (req, res) => {
    const { name, description, category, year, langs } = req.body;

    if (!name || !description || !category || !year || !langs) {
      res.status(400).send();
      return;
    }

    const project = new Project({ name, description, category, year, langs });

    project.save((err, projectStored) => {
      if (err) {
        return res.status(500).send('Error.');
      }

      if (!projectStored) {
        return res.status(500).send('Not stored');
      }

      return res.status(201).send(projectStored);
    });
  },
};

module.exports = controller;
