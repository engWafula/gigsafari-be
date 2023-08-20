const express = require("express")
const authController = require("../controllers/auth")
const {check,body} = require("express-validator/check")
const User = require("../Models/user")
const isAuth = require('../middleware/is-auth');

const router = express.Router()

router.post("/signup",[
    body("name").trim().isLength({min:5}),
    body("email").isEmail().withMessage("Please enter a valid email")
    .custom((value,{req})=>{
        return User.findOne({email:value}).then(userDoc=>{
            if(userDoc){
                return Promise.reject("Email already exists")
            }
        }).catch(err=>{
           console.log(err)
        })
    }).normalizeEmail(),
    body("password").trim().isLength({min:5}),
    body("name").trim().isLength({min:5}).not().isEmpty(),

],authController.signUp)

router.post("/login",authController.login)

router.get('/status', isAuth, authController.getUserStatus);

router.patch(
  '/status',
  isAuth,
  [
    body('status')
      .trim()
      .not()
      .isEmpty()
  ],
  authController.updateUserStatus
);

module.exports = router 