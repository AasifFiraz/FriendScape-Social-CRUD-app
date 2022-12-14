const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server");

module.exports = async (context) => {
  try {
    const authHeader = context.req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split("Bearer ")[1];
      if (token) {
        try {
          const decoded = jwt.verify(token, process.env.SECRET_KEY);
          return decoded;
        } catch (error) {
          throw new AuthenticationError("Invalid/Expired token");
        }
      }
      throw new Error(`Authentication token must be 'Bearer [token]'`);
    }
    throw new Error(`Authorization header must be provided`);
  } catch (error) {
    throw new Error(error);
  }
};
