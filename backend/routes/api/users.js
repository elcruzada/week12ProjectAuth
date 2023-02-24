const express = require('express')
const router = express.Router();

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
  ];

router.post(
    '/',
    // validateSignup,
    async (req, res) => {
      // console.log(res)
      const { firstName, lastName, email, password, username } = req.body;

      let validateSignupError = {
        "message": "User already exists",
        "statusCode": 403,
        "errors": ""
    }

      const existingEmail = await User.findOne({
        where: {
          email
        }
      })
      const existingUsername = await User.findOne({
        where: {
          username
        }
      })

      if (existingEmail && existingUsername) {
        validateSignupError.errors = {
          "email": "User with that email already exists",
          "username": "User with that username already exists"
        }
      }

        //condition for if user username exists
        if (existingEmail && !existingUsername) {
          validateSignupError.errors = {
           "email": "User with that email already exists"
          }
        }

        if (!existingEmail && existingUsername) {
          validateSignupError.errors = {
           "username": "User with that username already exists"
          }
        }

      if (existingEmail || existingUsername) return res.status(403).json(validateSignupError)

      let validationBodyError = {
        "message": "Validation error",
        "statusCode": 400,
        "errors": {}
      }

        if (!email) {
          validationBodyError.errors.email = "Invalid email"
        }

        if (!username) {
          validationBodyError.errors.username = "Username is required"
        }

        if (!firstName) {
          validationBodyError.errors.firstName = "First Name is required"
        }

        if (!lastName) {
          validationBodyError.errors.lastName = "Last Name is required"
        }

        if (!email || !username || !firstName || !lastName ) {
          res.status(400).json(validationBodyError)
        }


      const user = await User.signup({ firstName, lastName, email, username, password });
      // console.log(res)
      const sessionToken = await setTokenCookie(res, user);
      // const userInfo = user.firstName


      return res.status(200).json({
        // user: user
        "id": user.id,
        firstName,
        lastName,
        email,
        username,
        "token": sessionToken
      });
    }
  );

// router.get('/', async (req, res) => {
//   const {firstName, lastName }
// })

//Sign up a User
// router.post('/signup', )

module.exports = router;
