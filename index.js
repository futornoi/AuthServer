const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./Router/authRouters');
const userRouter = require('./Router/userRouters');
require('dotenv').config();
const cors = require("cors");

const {PORT = 3000, DB_URL = '', API_URL} = process.env;
const app = express();

//CORS
app.use(cors());
//JSON_PARSE
app.use(express.json());
//AUTH
app.use('/auth', authRouter);
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