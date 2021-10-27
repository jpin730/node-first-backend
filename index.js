'use strict';

const mongoose = require('mongoose');
const app = require('./app');
const port = process.env.PORT || 3000;

main()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Successfully connected to the database');

    app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`Server is running: http://localhost:${port}`);
    });
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err);
  });

async function main() {
  await mongoose.connect(
    'mongodb+srv://jpin730:PVmhD&n28eu^@cluster0.j5cov.mongodb.net/portfolio'
  );
}
