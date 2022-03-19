const {Router} = require('express');
const userController = require("../Controllers/userControllers");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = Router();

router.get('/users', roleMiddleware(['ADMIN']), userController.getUserList);

module.exports = router;
