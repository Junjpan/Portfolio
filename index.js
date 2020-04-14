const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = process.env.PORT || 5000;
const app = express();
const userRouter = require('./Routes/userRoute');
const projectRouter = require('./Routes/projectRoute');
const techRouter = require('./Routes/TechRoute');
const conn = require('./connection');

app.use(cors());
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`listen to port ${PORT}`);
});

app.use('/api/user', userRouter);
app.use('/api/projects', projectRouter);
app.use('/api/technical', techRouter);

// eslint-disable-next-line no-unused-vars
conn.once('open', (err, _db) => {
  console.log('Connected to MongodDB...');
  if (err) {
    throw err;
  }
});
