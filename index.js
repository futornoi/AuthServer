const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./Router/authRouters');
const rolesRouter = require('./Router/rolesRouters');
const userRouter = require('./Router/userRouters');
require('dotenv').config();

const {PORT = 3000, DB_URL = '', API_URL} = process.env;
const app = express();

app.use(require("morgan")('dev'));
app.use(require("cors")());
app.use(express.json());
//AUTH
app.use('/auth', authRouter);
//ENUMS
app.use('/enums', rolesRouter);
//USER
app.use(userRouter);

const start = async () => {
  try {
    await mongoose.connect(DB_URL);
    app.listen(PORT, (err) => {
      if(err) console.log(err);
      else console.log(`Server start in PORT ${PORT}...`);
    })
  } catch (e) {
    console.log(e)
  }
}

start();