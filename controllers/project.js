'use strict';

const Project = require('../models/project');

const controller = {
  getProject: (req, res) => {
    const { id } = req.params;

    if (id.length !== 24) {
      return res.status(404).send();
    }

    Project.findById(id, (err, project) => {
      if (err) {
        return res.status(500).send();
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
        return res.status(500).send();
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
      return res.status(400).send();
    }

    const project = new Project({ name, description, category, year, langs });

    project.save((err, projectPosted) => {
      if (err) {
        return res.status(500).send('Error');
      }

      if (!projectPosted) {
        return res.status(500).send('Not posted');
      }

      return res.status(201).send(projectPosted);
    });
  },

  putProject: (req, res) => {
    const { id } = req.params;

    const { name, description, category, year, langs } = req.body;

    if (id.length !== 24) {
      return res.status(404).send();
    }

    if (!name || !description || !category || !year || !langs) {
      return res.status(400).send();
    }

    Project.findByIdAndUpdate(
      id,
      { name, description, category, year, langs },
      (err, projectToUpdate) => {
        if (err) {
          return res.status(500).send();
        }

        if (!projectToUpdate) {
          return res.status(404).send();
        }

        return res.status(201).send(projectToUpdate);
      }
    );
  },

  deleteProject: (req, res) => {
    const { id } = req.params;

    Project.findByIdAndDelete(id, (err, projectToRemove) => {
      if (err) {
        return res.status(500).send();
      }

      if (!projectToRemove) {
        return res.status(404).send();
      }

      return res.status(200).send(projectToRemove);
    });
  },
};

module.exports = controller;
