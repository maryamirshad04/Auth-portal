const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.post('/signup', userController.createUser);
router.get('/list', userController.listUsers);
router.put('/update/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.post('/login', userController.loginUser);
router.get('/:id', userController.getUserById);

module.exports = router;