const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  Mutation: {
    async register(_, args) {
      try {
        const { username, email, password, confirmPassword } =
          args.registerInput;

          const existingUser = await User.findOne({ email: email });

        if (existingUser) {
          throw new Error("Email already exists, Please login");
        }
        if (password !== confirmPassword) {
            throw new Error("Password does not match");
  
        }
        const hashedPass = await bcrypt.hash(password, 15);

        const user = new User({
          username: username,
          email: email,
          password: hashedPass,
          createdAt: new Date(),
        });
        const addedUser = await User.create(user);
        // if user is registered without errors create a token
        const token = jwt.sign(
          {
            id: addedUser.id,
            email: addedUser.email,
            username: addedUser.username,
          },
          process.env.SECRET_KEY, {expiresIn: '3h'}
        );
        return { ...addedUser._doc, token, id: addedUser._id };
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
