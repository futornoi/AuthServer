const express = require('express');
const mongoose = require('mongoose');
const morgan = require("morgan");
const cors = require("cors");
require('dotenv').config();

const authRouter = require('./Router/authRouters');
const rolesRouter = require('./Router/rolesRouters');
const userRouter = require('./Router/userRouters');
const filesRouter = require('./Router/filesRouters');

const {PORT = 3000, DB_URL} = process.env;
const app = express();

//COMMON
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
//AUTH
app.use('/auth', authRouter);
//ENUMS
app.use('/enums', rolesRouter);
//USER
app.use(userRouter);
//FILES
app.use(filesRouter);

const start = async () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }

  try {
    await mongoose.connect(DB_URL, connectionParams);

    app.listen(PORT, (err) => {
      if(err) console.log(err);
      else console.log(`Server start in PORT ${PORT}...`);
    })
  } catch (e) {
    console.log(e)
  }
}

start();