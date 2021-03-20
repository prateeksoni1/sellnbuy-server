const router = require('express').Router();
const { isSuperAdmin, checkAuthStatus } = require('../users/controllers');
const { getAdminRequests, approveRequest } = require('./controllers');

router.get('/', checkAuthStatus, isSuperAdmin, getAdminRequests);
router.post('/approve', checkAuthStatus, isSuperAdmin, approveRequest);

module.exports = router;
