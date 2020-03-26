const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const conn = require('./connection');
const userRouter = require('./Routes/userRoute');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`listen to port ${PORT}`);
});

conn.once('open', (err, db) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MongodDB...');

  app.use('/api/user', userRouter);
});
