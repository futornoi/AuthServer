const {Router} = require('express');
const {check} = require("express-validator");
const authError = require("../Constants");
const userController = require("../Controllers/userControllers");
const roleMiddleware = require("../middleware/roleMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const uploadMiddleware = require("../middleware/uploadMiddleware");

const router = Router();

router.get('/users/:id?', authMiddleware, userController.getUserList);

router.delete('/users/:id', roleMiddleware(['ADMIN']), userController.deleteUser);

router.post('/users-edit/:id', [
  check("name", authError.NotEmpty('user name')).notEmpty().trim(),
  check("name", authError.TooSmall(4)).isLength({min: 4}),
  check("email", authError.NotEmpty('email')).notEmpty(),
  check("email", authError.InvalidData('email')).isEmail(),
  check("roles", authError.InvalidData('roles')).isIn(['ADMIN', "USER"])
], roleMiddleware(['ADMIN']), userController.updateUser);

router.post('/authUser', authMiddleware, userController.getAuthUser);

router.post('/upload-user-file/:id', authMiddleware, uploadMiddleware.single('user-avatar'), userController.uploadFile);

module.exports = router;
