const express = require('express');

const app = express();
const port = 8000;

app.get('/', (req, res) => {
  res.send('Hello App');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening at http://localhost:${port}`);
});
