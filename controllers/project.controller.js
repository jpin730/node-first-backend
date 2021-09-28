'use strict';

const Project = require('../models/project.model');
const fs = require('fs');
const path = require('path');

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
        return res.status(404).send();
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
        return res.status(404).send();
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
      { new: true },
      (err, projectUpdated) => {
        if (err) {
          return res.status(500).send();
        }

        if (!projectUpdated) {
          return res.status(404).send();
        }

        return res.status(201).send(projectUpdated);
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

  getProjectImage: (req, res) => {
    const { id } = req.params;

    Project.findById(id, (err, project) => {
      if (err) {
        return res.status(500).send();
      }

      if (!project || !project.image) {
        return res.status(404).send();
      }

      const imagePath = `./uploads/${project.image}`;

      fs.access(imagePath, (err) => {
        if (err) {
          return err.code === 'ENOENT'
            ? res.status(404).send()
            : res.status(500).send();
        }

        return res.status(200).sendFile(path.resolve(imagePath));
      });
    });
  },

  putProjectImage: (req, res) => {
    const { id } = req.params;

    if (id.length !== 24) {
      return res.status(404).send();
    }

    const { image } = req.files;
    const imageName = image.path.split('/').pop();
    const imageExtension = imageName.split('.').pop().toLowerCase();
    const validExtensions = ['jpg', 'jpeg', 'png'];

    if (image && validExtensions.includes(imageExtension)) {
      Project.findByIdAndUpdate(
        id,
        { image: imageName },
        { new: true },
        (err, projectUpdated) => {
          if (err) {
            return res.status(500).send();
          }

          if (!projectUpdated) {
            return res.status(404).send();
          }

          return res.status(201).send(projectUpdated);
        }
      );
    } else {
      if (image) {
        fs.unlink(image.path, () => {});
      }
      return res.status(400).send();
    }
  },
};

module.exports = controller;
