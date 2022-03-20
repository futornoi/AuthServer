const {Router} = require('express');
const userController = require("../Controllers/userControllers");
const roleMiddleware = require("../middleware/roleMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

const router = Router();

router.get('/users/:id?', userController.getUserList);
router.post('/users', roleMiddleware);

router.post('/authUser', authMiddleware, userController.getAuthUser);

module.exports = router;
