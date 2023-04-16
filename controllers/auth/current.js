const сurrent = async (req, res) => {
  const { email, name, shoppingList, createdAt, updatedAt } = req.user;

  return res.json({
    email,
    name,
    shoppingList,
    createdAt,
    updatedAt,
  });
};

module.exports = сurrent;
