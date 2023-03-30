module.exports.petRegister = async (req, res) => {
  try {
    const owner = req.user.id;
    const petData = req.body;
    const data = !!req.file
      ? { avatarURL: req.file.path, owner, ...petData }
      : { owner, ...petData };

    const pet = await Pet.create(data);
    if (pet) {
      const user = await User.findByIdAndUpdate(owner, { $push: { userPets: pet._id } });
      if (user) {
        res.status(201).json({ success: true, pet });
      }
    }
  } catch (err) {
    res.status(400).json({ success: false, error: err, message: err.message });
  }
};