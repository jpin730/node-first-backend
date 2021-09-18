'use strict';

const mongoose = require('mongoose');
const app = require('./app');
const port = 3700;

main()
  .then(() => {
    console.log('Successfully connected to the database');

    app.listen(port, () => {
      console.log(`Server is running: http://localhost:${port}`);
    });
  })
  .catch((err) => console.error(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/test');
}
