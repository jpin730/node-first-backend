'use strict';

const mongoose = require('mongoose');
const app = require('./app');
const port = process.env.PORT || 3000;

require('dotenv').config();

main()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Successfully connected to the database');

    app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err);
  });

async function main() {
  await mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.j5cov.mongodb.net/portfolio`
  );
}
