const path = require("path");
const fs = require("fs/promises");
const { ctrlWrapper } = require("../../helpers");

const { User } = require("../../models/user");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const resultUpload = path.join(avatarsDir, originalname);
  await fs.rename(tempUpload, resultUpload);
  const avatarUrl = path.join("avatars", originalname);
  await User.findByIdAndUpdate(_id, avatarUrl);

  res.json({
    avatarUrl,
  });
};

module.exports = ctrlWrapper(updateAvatar);
