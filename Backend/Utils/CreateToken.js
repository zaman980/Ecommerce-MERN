const jwt = require("jsonwebtoken");
const generateToken = (user) => {
  if (!user || !user._id) {
    throw new Error("User ID is required to generate a token.");
  }

  const { _id, isAdmin } = user; // Destructure user properties

  const token = jwt.sign({ userId: _id, isAdmin }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  console.log(_id,isAdmin)

  return token; // Return the generated token
};

module.exports = generateToken;