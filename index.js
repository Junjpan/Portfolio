const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const GridFsStream = require('gridfs-stream');
const conn = require('./connection');
const userRouter = require('./Routes/userRoute');
const projectRouter = require('./Routes/projectRoute');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`listen to port ${PORT}`);
});

// eslint-disable-next-line no-unused-vars
let gfs;
// eslint-disable-next-line no-unused-vars
conn.once('open', (err, _db) => {
  console.log('Connected to MongodDB...');
  gfs = GridFsStream(conn.db, mongoose.mongo);
  gfs.collection('uploads');
  if (err) {
    throw err;
  }
});

app.use('/api/user', userRouter);
app.use('/api/projects', projectRouter);

module.exports = { gfs };
