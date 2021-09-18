'use strict';

// eslint-disable-next-line no-undef
const mongoose = require('mongoose');

main()
  .then(() => {
    console.log('Successfully connected to the database');
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/test');
}
