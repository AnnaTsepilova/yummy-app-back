const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: String,
    category: String,
    area: String,
    instructions: String,
    description: String,
    thumb: String,
    preview: String,
    time: String,
    popularity: {
        type: Number,
        default: 0
    },
    preparation: String,
    favorites: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: []
    },
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: []
    },
    youtube: String,
    tags: [String],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: Date,
    ingredients: {
        type: [
            {
                name: String,
                amount: String
            }
        ]
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
