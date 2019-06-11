const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const Auth = require('./authModel.js')

const restricted = (req, res, next) => {
  if (req.session && req.session.username) {
    next();
  } else {
    res.status(401).json({ message: 'You shall not pass!' });
  }
};

router.post('/register', (req, res) => {
  let user = req.body;
  user.password = bcrypt.hashSync(user.password, 12);
  Auth.addUser(user)
    .then(data => res.status(201).json({ message: "registration successful" }))
    .catch(err => res.status(500).json(
      { message: "you've met with a terrible fate, haven't you?", error: err }
    ))
})

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Auth.findByUsername(username)
    .then(data => {
      if (data && bcrypt.compareSync(password, data.password)) {
        req.session.username = data.username;
        res.status(200).json({
          message: `login successful`,
        });
      } else {
        res.status(401).json({ message: 'You shall not pass!' });
      }
    })
    .catch(err => {
      res.status(500).json(
        { message: "you've met with a terrible fate, haven't you?", error: err }
      );
    });
});

router.get('/users', restricted, (req, res) => {
  Auth.findUsers()
    .then(data => res.status(200).json(data))
    .catch(err => {
      res.status(500).json(
        { message: "you've met with a terrible fate, haven't you?", error: err }
      );
    });
});


router.delete('/', (req, res) => {
  if (req.session) {
    req.session.destroy();
  }
  res.status(200).json({ message: 'peace out' });
});

module.exports = router;