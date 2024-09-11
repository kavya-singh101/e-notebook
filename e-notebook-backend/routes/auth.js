const express = require('express')
const User = require("../models/User")
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');


const JWT_SECRET = "Cheen tapak dam dam"
const router = express.Router()


// Rout 1:-
// create user using POST: "/api/auth/createuser. No login required"
router.post('/createuser', [
  body("name", "Enter a valid name").isLength({ min: 3 }),
  body("email", "Enter a valid mail").isEmail(),
  body("password").isLength({ min: 8 }),
], async (req, res) => {


  // If error detected then return bad request and errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }


  // for any runtime error in syntax
  try {
    // check weather user with the same email existed
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ meaage: "User with this email already exist" })
    }

    const salt = await bcrypt.genSalt(10);
    const securePass = await bcrypt.hash(req.body.password, salt);

    // creating user
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: securePass,
    })
    // sending response
    const data = {
      id: user.id
    }
    // making token using user id and a secret string 
    const authToken = jwt.sign(data, JWT_SECRET)
    // console.log(jwtData)
    res.json({ authToken })
  } catch (error) {
    console.error(error.meaage)
    res.status(500).send("some error aa gaya")
  }

  // .then(user => res.json(user)).catch(err => { console.log(err)
  //   res.json({error:"please enter unique email",message:err.message})
  //  })
})



// Rout 2:-

// Authenticate user
router.post('/login', [
  body("email", "Enter a valid mail").isEmail(),
  body("password", "Password can't be blank").exists(),
], async (req, res) => {
  let success = false;

  // If error detected then return bad request and errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }


  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(500).json({ errors: "Invalid username or password" })
    }

    // comparing password if email is valid
    const passwordCompare = await bcrypt.compare(password, user.password)
    if (!passwordCompare) {
      success = false;
      return res.status(500).json({ success, errors: "Invalid username or password" })
    }


    // response by server (user id) if bith id pass is correct
    const payload = {
      user: {
        id: user.id
      }
    }

    const authToken = jwt.sign(payload, JWT_SECRET)
    // console.log(jwtData)
    success = true
    res.json({ success, authToken })

  } catch (error) {
    console.error(error.meaage)
    res.status(500).send("Server error")
  }
})

// Rout 3:-
// get loggedin user detail using post "api/auth/getuser"
router.post('/getuser', fetchuser, async (req, res) => {

  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.meaage)
    res.status(500).send("Server error")
  }
})
module.exports = router