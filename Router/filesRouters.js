const {Router} = require('express');
const Grid = require("gridfs-stream");
const mongoose = require("mongoose");
const authError = require("../Constants");

const router = Router();

let gridFs, gridFsBucket;
const conn = mongoose.connection;

conn.once('open', () => {
  gridFsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'files'
  });

  gridFs = Grid(conn.db, mongoose.mongo);
  gridFs.collection('files');
})

router.get('/:filename', async (req , res) => {
  try {
    const file = await gridFs.files.findOne({filename: req.params.filename});

    if(!file) return res.status(404).send('Image not fount');

    const readStream = gridFsBucket.openDownloadStream(file._id);
    readStream.pipe(res);

  } catch (e) {
    console.log(e)
    res.status(404).send(authError.SOME);
  }
})

module.exports = router