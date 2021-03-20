const router = require('express').Router();
const { isAuthenticated, isSuperAdmin } = require('../users/controllers');
const { getAdminRequests, approveRequest } = require('./controllers');

router.get('/', isAuthenticated, isSuperAdmin, getAdminRequests);
router.post('/approve', isAuthenticated, isSuperAdmin, approveRequest);

module.exports = router;
