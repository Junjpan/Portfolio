const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
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
conn.once('open', (err, db) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MongodDB...');
});

app.use('/api/user', userRouter);
app.use('api/project', projectRouter);
