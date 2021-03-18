const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const { getUsers, register, login, isAuthenticated } = require('./controllers');
const User = require('./model/users.entity');
const router = require('express').Router();

router.route('/').get(getUsers).post(register);

router.post('/login', login);

router.get('/isAuthenticated', isAuthenticated);

module.exports = router;
