const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const User = require('./model/users.entity');
const Cart = require('../cart/model/cart.entity');

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();

    return res.status(200).json({
      ok: true,
      users,
    });
  } catch (err) {
    return next(err);
  }
};

exports.register = async (req, res, next) => {
  try {
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

    await Cart.create({
      userId: user.id,
    });

    return res.status(201).json({
      ok: true,
      user,
    });
  } catch (err) {
    return next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.SUPER_ADMIN_EMAIL &&
      password === process.env.SUPER_ADMIN_PASSWORD
    ) {
      const token = jwt.sign({ superAdmin: true }, process.env.JWT_SECRET, {
        expiresIn: '365d',
      });

      return res.json({
        ok: true,
        token,
        superAdmin: true,
        role: 'superAdmin',
      });
    }

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
      role: existingUser.userType,
    });
  } catch (err) {
    return next(err);
  }
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

  if (data.superAdmin) {
    req.superAdmin = true;

    return next();
  }

  req.user = await User.findByPk(data.id);

  if (!req.user) {
    return res.status(401).json({
      ok: false,
      message: 'Invalid token',
    });
  }

  return next();
};

exports.isAuthenticated = async (req, res, next) => {
  try {
    const { authorization } = req.headers; // Bearer token

    const token = authorization.split(' ')[1];
    if (token === 'null' || token === undefined || token === '') {
      return res.status(401).json({
        ok: false,
        message: 'Invalid token',
      });
    }

    const data = jwt.verify(token, process.env.JWT_SECRET);

    if (!data) {
      return res.status(401).json({
        ok: false,
        message: 'Invalid token',
      });
    }

    if (data.superAdmin) {
      return res.json({
        ok: true,
        superAdmin: true,
        role: 'superAdmin',
      });
    }

    const user = await User.findByPk(data.id);

    if (!user) {
      return res.status(401).json({
        ok: false,
        message: 'Invalid token',
      });
    }

    return res.json({
      ok: true,
      role: user.userType,
    });
  } catch (err) {
    return next(err);
  }
};

exports.isSuperAdmin = (req, res, next) => {
  try {
    if (!req.superAdmin) {
      return res.status(401).json({
        ok: false,
        message: 'Only superadmin can access this route',
      });
    }

    return next();
  } catch (err) {
    return next(err);
  }
};

exports.isAdmin = (req, res, next) => {
  try {
    const { user } = req;

    if (user.userType === 'admin' && user.approved) {
      next();
    }

    return res.status(401).json({
      ok: false,
      message: 'Only admin can access this route',
    });
  } catch (err) {
    return next(err);
  }
};

exports.isUser = (req, res, next) => {
  try {
    const { user } = req;

    if (user.userType === 'user') {
      return next();
    }

    return res.status(401).json({
      ok: false,
      message: 'Only user can access this route',
    });
  } catch (err) {
    return next(err);
  }
};


