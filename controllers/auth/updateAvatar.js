const { v4: uuidv4 } = require('uuid');
const cloudinary = require('cloudinary').v2;
const User = require('../../models/user');
const path = require('path');

const updateAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a file' });
    }

    const { _id } = req.user;

    const uniqueFilename = uuidv4();
    const extension = path.extname(req.file.originalname);
    const fileName = `${uniqueFilename}${extension}`;

    const result = await cloudinary.uploader.upload(req.file.path, {
      public_id: `avatars/${fileName}`,
      folder: 'so-yummy',
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    });

    const avatarUrl = result.secure_url;

    const user = await User.findOneAndUpdate({ _id }, { avatar: avatarUrl }, { new: true });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'Avatar uploaded successfully',
      user: {
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {

    console.error(error);
    res.status(500).send('Something went wrong');
  }
};

module.exports = updateAvatar;
