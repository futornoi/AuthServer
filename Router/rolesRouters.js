const { Router } = require('express');
const router = Router();
const authMiddleware = require('../middleware/authMiddleware');
const rolesController = require("../Controllers/rolesController");

router.get('/roles', authMiddleware, rolesController.getRolesList)

module.exports = router;