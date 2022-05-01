const multer = require("multer");
const {GridFsStorage} = require("multer-gridfs-storage");

const storage = GridFsStorage({
  url: process.env.DB_URL,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg"]
    const filename = `${Date.now()}_futornoi_${file.originalname}`;

    if (match.includes(file.mimetype)) {
      return {
        bucketName: "files",
        filename,
      }
    } else {
      throw new Error('Wrong file type');
    }
  }
})

module.exports = multer({storage});