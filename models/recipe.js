const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: String,
    area: String,
    instructions: {
        type: String,
        // required: true
    },
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
        ],
        // required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
