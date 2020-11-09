const mongoose = require('mongoose');

let options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 100,
  useFindAndModify: false,
};
mongoose.connect(process.env.MONGO_APP_URL, options);
mongoose.set('autoIndex', false);

const db = mongoose.connection;

db.on('error', (err) => {
  console.error(new Error('Reclamation Server | MongoDB | Could not connect to database'), err);
});
db.once('open', (data) => {
  console.info('Reclamation Server | MongoDB | Database Connected', data);
});

module.exports = {
  db,
  mongoose,
};
