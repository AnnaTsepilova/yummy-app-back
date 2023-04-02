const { BadRequest } = require('http-errors');
const Ingredients = require('../../models/ingredient');
const User = require('../../models/user');
const addItemInList = async (req, res) => {
    const { id } = req.user;
    if (!req.body) {
        throw new BadRequest('Need Body');
    }
    const ingrName = Object.keys(req.body).join('');
    const ingrCount = Object.values(req.body).join('');
    const user = await User.findById(id);
    const ingrId = await Ingredients.findOne({ _id: ingrName }).select({ _id: 1 });
    const ingrToShoppingList = {
        id: ingrId._id,
        messure: ingrCount
    }
    const checkIds = user.shopingList.filter(item => item.id.toString() === ingrId._id.toString())
    if (checkIds.length > 0) {
        const messureCount = parseInt(ingrCount.split(' ')[0]);
        const messure = user.shopingList.filter(item => item.id.toString() === ingrId._id.toString()).map(item => item.messure);
        const messureItem = messure.join('').split(' ');
        const ingrToShoppingList = {
            id: ingrId._id,
            messure: parseInt(messureItem[0]) + messureCount + ' ' + messureItem[1]
        }
        const newIngrCount = user.shopingList.findIndex(item => item.id.toString() === ingrId._id.toString());
        await user.shopingList.splice(newIngrCount, 1);
        await user.shopingList.push(ingrToShoppingList);
        const addedToShoppingList = await User.findOneAndUpdate({ _id: id }, { shopingList: user.shopingList }, { new: true })
        return res.status(200).json(addedToShoppingList);
    }
    const addedToShoppingList = await User.findOneAndUpdate({ _id: id }, { $push: { shopingList: ingrToShoppingList } }, { new: true })
    return res.status(200).json(addedToShoppingList);
}



module.exports = addItemInList;