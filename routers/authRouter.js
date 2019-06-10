const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const Auth = require('./authModel.js')

router.use('/register', (req, res) => {
  let user = req.body;
  user.password = bcrypt.hashSync(user.password, 12);
  Auth.addUser(user)
    .then(data => res.status(201).json({ message: "registration successful" }))
    .catch(err => res.status(500).json(
      { message: "you've met with a terrible fate, haven't you?", error: err }
    ))
})

module.exports = router;