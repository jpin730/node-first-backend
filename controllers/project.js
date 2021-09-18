'use strict';

const controller = {
  home: (req, res) => {
    res.status(200).send({
      message: 'Home',
    });
  },
};

module.exports = controller;
