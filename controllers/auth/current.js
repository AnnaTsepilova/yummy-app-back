const сurrent = async (req, res) => {
  const { _id, email, name, shoppingList, createdAt, updatedAt } = req.user;
  console.log(req.user);
  return res.json({
    id: _id,
    email,
    name,
    shoppingList,
    createdAt,
    updatedAt,
  });
};

module.exports = сurrent;
