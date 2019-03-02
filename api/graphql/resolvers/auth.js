const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../../models/user');


module.exports = {
  createUser: (args) => {
    return User.findOne({ email: args.userInput.email })
      .then((user) => {
        if (user) {
          throw new Error('User with that Email already exist');
        }
        return bcrypt.hash(args.userInput.password, 12);
      })
      .then((hashedPassword) => {
        const user = new User({
          username: args.userInput.username,
          email: args.userInput.email,
          password: hashedPassword,
        });
        return user.save();
      })
      .then((result) => {
        return { ...result._doc, password: null, _id: result.id };
      })
      .catch((err) => {
        throw err;
      });
  },
  login: async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('User with that email does not exist');
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (isValidPassword) {
      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email,
        },
        process.env.SECRET_KEY,
        { expiresIn: '1h' },
      );
      return {
        userId: user.id,
        token,
        tokenExpiration: 1,
      };
    }
    throw new Error('Wrong Email or Password');
  },
};
