const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { GraphQLError } = require("graphql");
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../utils/validators");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    process.env.SECRET_KEY,
    { expiresIn: "3h" }
  );
};

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

        const { isValid, errors } = validateRegisterInput(
          username,
          email,
          password,
          confirmPassword
        );

        if (!isValid) {
          throw new GraphQLError(JSON.stringify(errors));
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
        const token = generateToken(addedUser);
        return { ...addedUser._doc, token, id: addedUser._id };
      } catch (error) {
        throw new Error(error);
      }
    },
    async login(_, { loginInput: { email, password } }) {
      try {
        const { isValid, errors } = validateLoginInput(email, password);

        if (!isValid) {
          throw new GraphQLError(JSON.stringify(errors));
        }

        const user = await User.findOne({ email });

        if (!user)
          throw new GraphQLError(`User with email : ${email} does not exist`);

        const isPasswordValid = bcrypt.compareSync(
          password,
          user.password
        );

        if (!isPasswordValid)
          throw new GraphQLError("Password is incorrect, Please try again");

        const token = generateToken(user);

        return { token, ...user._doc, id: user._id };
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
