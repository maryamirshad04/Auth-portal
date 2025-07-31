const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const verifyToken = require('../middleware/auth'); 

router.post('/signup', userController.createUser);
router.get('/list', userController.listUsers);
router.put('/update/:id', verifyToken, userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.post('/login', userController.loginUser);
router.get('/:id', userController.getUserById);
router.get('/user/list', verifyToken, userController.listUsers);

module.exports = router;