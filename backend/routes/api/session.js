const express = require('express')
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors
];


router.post(
    '/',
    // validateLogin,
    async (req, res, next) => {
      const { credential, password } = req.body;
      // let errorResult = { errors: [] }
      const userOutput = await User.login({ credential, password });

      // const userEmails = await User.findAll({
      //   attributes: ['email']
      // })

      // const allUsernames = await User.findAll({
      //   attributes: ['username']
      // })


      // const username = await User.findAll({
      //   attributes: ['hashedPassword']
      // })



      // let emailTruthy = false
      // for (let email of userEmails) {
      //   // console.log(email)

      // }


      // console.log(userEmails)
      // return res.json(userEmails[3].email)
      // return res.json(userPasswords)
      // const userEmailLength = userEmails.length
      // let count = 0
//was userOutput

      // if (!credential && !password) {
      //   const thisErr = new Error('No credential or password')
      //   thisErr.status = 400
      //   res.status(400)
      //   res.json({
      //     "message": "Validation error",
      //     "statusCode": thisErr.status,
      //     "errors": {
      //       "credential": "Email or username is required",
      //       "password": "Password is required"
      //     }
      //   })
      // }

      const loginUserError = {
        "message": "Validation error",
        "statusCode": 400,
        "errors": {}
      }

    if (!credential) loginUserError.errors.credential = "Email or username is required"
    if (!password) loginUserError.errors.password = "Password is required"

      if (!credential || !password) {
       return res.status(400).json(loginUserError)
      }

      if (credential && password && !userOutput) {
       res.status(401).json({
        "message": "Invalid credentials",
        "statusCode": 401
      })
    }
    //   console.log(credential.split(''))
    //   if (!credential.split('').includes('@')) {

    //   }

    // for (let i = 0; i < userEmails.length; i++) {
    //   let userEmail = userEmails[i].email
    //   if (credential === userEmail) break
    //   if (i === userEmails.length - 1) {
    //     const err = new Error('Login failed');
    //     err.status = 401;
    //     // const err = new Error('Login failed');
    //     // err.status = 401;
    //     // err.title = 'Login failed';
    //     // err.errors = ['The provided credentials were invalid.'];
    //     // return next(err);

    //     // errorResult.errors.push({
    //     //  "message": "Invalid credentials",
    //     //  "statusCode": err.status
    //     // })
    //    return res.json({
    //     "message": "Invalid credentials",
    //     "statusCode": err.status
    //    })
    //   }
    // }
      await setTokenCookie(res, userOutput);


      // const { id, email, firstName, lastName, username } = req.query
      // const user = await User.findOne({
      //   where: {
      //     email: credential
      //   },
      //   attributes: ['id', 'firstName', 'lastName', 'email', 'username']
      // })

      return res.status(200).json({
          userOutput
            // userOutput
      });
    }
  );

  router.delete(
    '/',
    (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
  );

  router.get(
    '/',
    restoreUser,
    (req, res) => {
      const { user } = req;
      if (user) {
        return res.json({
          user: user.toSafeObject()
        });
      } else return res.json({ user: null });
    }
  );

module.exports = router;
