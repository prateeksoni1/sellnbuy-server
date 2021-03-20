const User = require('../users/model/users.entity');

exports.getAdminRequests = async (req, res, next) => {
  try {
    const users = await User.findAll({
      where: {
        userType: 'admin',
      },
    });

    return res.json({
      ok: true,
      users,
    });
  } catch (err) {
    return next(err);
  }
};

exports.approveRequest = async (req, res, next) => {
  try {
    // TODO
  } catch (err) {
    return next(err);
  }
};
