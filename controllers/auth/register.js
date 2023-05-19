const { User } = require("../../models");
const { ctrlWrapper } = require("../../helpers");

const register = async (req, res, next) => {
  const newUser = await User.create(req.body);

  res.json({
    email: newUser.email,
  });
};

module.exports = ctrlWrapper(register);
