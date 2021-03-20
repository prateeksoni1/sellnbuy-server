const router = require('express').Router();
const { isAuthenticated, isSuperAdmin } = require('../users/controllers');
const { getAdminRequests } = require('./controllers');

router.get('/', isAuthenticated, isSuperAdmin, getAdminRequests);

module.exports = router;
