const router = require('express').Router();
const userController = require('../controllers/user-controller');
const validateUserRegister = require('../middlewares/user-validator');

router.post('/register',validateUserRegister,userController.register);
router.get('/', userController.getAllUser);
router.get('/users/:id',userController.getDetail)
router.get('/user', userController.getUserbyID);
//put
router.post('/edits/:id',validateUserRegister,userController.editUserbyID);
//delete
router.post('/delete/:id', userController.deleteUser);

module.exports = router;