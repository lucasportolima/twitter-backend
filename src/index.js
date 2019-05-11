const { config } = require('dotenv');
const { join } = require('path');
const { ok } = require('assert');

const env = process.env.NODE_ENV || "dev";
ok(env === "production" || env === "dev", "A env é invalida!");

const configPath = join(__dirname, './config', `.env.${ env }`);
config({ path: configPath });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

mongoose.connect(
  process.env.MONGODB_URL,
  {
    useNewUrlParser: true
  }
)

app.use(cors());

app.use((req, res, next) => {
  req.io = io;
  
  return next();
});

app.use(express.json());
app.use(require("./routes"));

server.listen(process.env.PORT, () => {
  console.log('Server :D started on port 3000');
});