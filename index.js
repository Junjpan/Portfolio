const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRouter = require('./Routes/userRoute');
const projectRouter = require('./Routes/projectRoute');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`listen to port ${PORT}`);
});

app.use('/api/user', userRouter);
app.use('/api/projects', projectRouter);
