const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const User = require('./model/users.entity');

exports.getUsers = async (req, res) => {
  const users = await User.findAll();

  return res.status(200).json({
    ok: true,
    users,
  });
};

exports.register = async (req, res) => {
  const { name, contact, email, password, userType } = req.body;
  const existingUser = await User.findOne({
    where: { email },
  });

  if (existingUser) {
    return res.status(409).json({
      ok: false,
      message: 'User already exists',
    });
  }

  const hashedPassword = await argon2.hash(password, {
    saltLength: 12,
  });

  const user = await User.create({
    name,
    contact,
    email,
    password: hashedPassword,
    userType,
  });

  return res.status(201).json({
    ok: true,
    user,
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({
    where: { email },
  });

  if (!existingUser) {
    return res.status(404).json({
      ok: false,
      message: 'No user exists',
    });
  }

  const isValid = await argon2.verify(existingUser.password, password);

  if (!isValid) {
    return res.status(401).json({
      ok: false,
      message: 'Invalid Email/Password',
    });
  }

  const token = jwt.sign({ id: existingUser.id }, process.env.JWT_SECRET, {
    expiresIn: '365d',
  });

  return res.json({
    ok: true,
    token,
  });
};

exports.checkAuthStatus = async (req, res, next) => {
  const { authorization } = req.headers; // Bearer token
  if (!authorization) {
    return res.status(404).json({
      ok: false,
      message: 'No token provided',
    });
  }
  const token = authorization.split(' ')[1];

  const data = jwt.verify(token, process.env.JWT_SECRET);

  if (!data) {
    return res.status(401).json({
      ok: false,
      message: 'Invalid token',
    });
  }

  req.user = await User.findByPk(data.id);

  return next();
};

exports.isAuthenticated = (req, res) => {
  const { authorization } = req.headers; // Bearer token
  const token = authorization.split(' ')[1];

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
};

exports.isAdmin = (req, res, next) => {
  const { user } = req;

  if (user.userType === 'admin') {
    next();
  }

  return res.status(401).json({
    ok: false,
    message: 'Only admin can access this route',
  });
};

exports.isUser = (req, res, next) => {
  const { user } = req;

  if (user.userType === 'user') {
    return next();
  }

  return res.status(401).json({
    ok: false,
    message: 'Only user can access this route',
  });
};
