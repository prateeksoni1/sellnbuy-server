const argon2 = require('argon2');
const router = require('express').Router();

const User = require('./model/users.entity');

router
  .route('/')
  .get(async (req, res) => {
    const users = await User.findAll();

    return res.status(200).json({
      ok: true,
      users,
    });
  })
  .post(async (req, res) => {
    const { name, contact, email, password, userType } = req.body;
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(409).json({
        ok: false,
        message: 'User already exists',
      });
    }

    const hashedPassword = await argon2.hash(password, { saltLength: 12 });

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
  });

module.exports = router;
