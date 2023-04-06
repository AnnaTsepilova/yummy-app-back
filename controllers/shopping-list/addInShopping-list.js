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
    const ingr = await Ingredients.findOne({ _id: ingrName }).select({ ttl: 1, thb: 1 });
    const ingrToShoppingList = {
        ttl: ingr.ttl,
        thb: ingr.thb,
        id: ingrId._id,
        measure: ingrCount
    }
    const messureName = ingrCount.split(' ')[1];
    const checkIds = user.shopingList.filter(item => item.id.toString() === ingrId._id.toString())
    const messure = user.shopingList.filter(item => item.id.toString() === ingrId._id.toString()).filter(item => item.measure?.split(' ')[1] === messureName).map(item => item.measure);
    if (checkIds.length > 0 && messure.length > 0) {
        const messureCount = parseInt(ingrCount.split(' ')[0]);
        const messureItem = messure.join('').split(' ');
        console.log(messureItem[1])
        const ingrToShoppingList = {
            ttl: ingr.ttl,
            thb: ingr.thb,
            id: ingrId._id,
            measure: !messureItem[1] ? parseInt(messureItem[0]) + messureCount + '' : parseInt(messureItem[0]) + messureCount + ' ' + messureItem[1]

        }
        const newIngrCount = await user.shopingList.findIndex(item => item.id.toString() === ingrToShoppingList.id.toString() && item.measure?.split(' ')[1] === messureName);
        await user.shopingList.splice(newIngrCount, 1, ingrToShoppingList);
        const addedToShoppingList = await User.findOneAndUpdate({ _id: id }, { shopingList: user.shopingList }, { new: true }).select({ shopingList: 1 })
        return res.status(200).json(addedToShoppingList);
    }
    const addedToShoppingList = await User.findOneAndUpdate({ _id: id }, { $push: { shopingList: ingrToShoppingList } }, { new: true }).select({ shopingList: 1 })
    return res.status(200).json(addedToShoppingList);
}



module.exports = addItemInList;