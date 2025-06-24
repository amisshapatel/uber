const express = require('express')
const router = express.Router();
const { body} =require('express-validator')
const userController = require('../controllers/user.controller')

router.post('/register',[
    body('email').isEmail().withMessage('invalid email'),
    body('fullname.firstname').isLength({min:3}).withMessage('first name must be at least 3 charcter long'),
    body('password').isLength({min:6}).withMessage('password must be atleast 4 character')
],
    userController.registerUser
)

router.post('/login', [
    body('email').isEmail().withMessage('invalid email'),
    body('password').isLength({ min: 6 }).withMessage('password must be at least 6 characters')
], userController.loginUser);

module.exports = router;