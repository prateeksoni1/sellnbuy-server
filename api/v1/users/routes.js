const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const { getUsers, register, login } = require('./controllers');
const User = require('./model/users.entity');
const router = require('express').Router();

router.route('/').get(getUsers).post(register);

router.post('/login', login);

router.get('/isAuthenticated', (req, res) => {
  let { Authorization } = req.headers; // Bearer token
  const token = Authorization.split(' ')[1];

  const isValid = jwt.verify(token, process.env.JWT_SECRET);

  if (!isValid) {
    return res.status(401).json({
      ok: false,
      message: 'Invalid token',
    });
  }

  return res.json({
    ok: true,
  });
});

module.exports = router;
