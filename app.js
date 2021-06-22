const express = require('express');
const cors = require('cors');
const indexRouter = require('./routes/jobs');

const app = express();
app.use(cors());

app.use(express.json());
app.use('/', indexRouter);

const port = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.send('Welcome to job posting backend');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on ${port}`);
});
