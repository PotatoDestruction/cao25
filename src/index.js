const express = require('express');
const cors = require('cors');
const { port } = require('./config');

const { auth, tutorials } = require("./routes/v1/index");

const app = express();

app.use(express.json());
app.use(cors());

app.use('/v1/auth', auth);
app.use("/v1/tutorials", tutorials);



app.get('/', (req, res) => {
  res.send({ msg: 'Online' });
});

app.all('*', (req, res) => {
  res.status(404).send({ error: 'Page not found qqqq' });
});

app.listen(port, () => {
    console.log(`${port}... Online`)
})