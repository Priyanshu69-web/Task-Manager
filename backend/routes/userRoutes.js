const express =require('express');
const { protect, adminOnly } = require('../middlewares/authMiddleware.js');

const {getUserById, getUsers, deleteUser} =require('../controllers/userController.js');

const router =express.Router();

router.get("/" ,protect, adminOnly, getUsers);
router.get("/:id", protect, getUserById);
// router.delete("/:id", protect, adminOnly, deleteUser);


module.exports =router;
