const { getUsers, register } = require('./controllers');
const router = require('express').Router();

router.route('/').get(getUsers).post(register);

module.exports = router;
