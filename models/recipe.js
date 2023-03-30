const { Schema, model, SchemaTypes } = require('mongoose');

const recipeSchema = new Schema({

    title: {
        type: String
    },
    category: {
        type: String
    },
    area: {
        type: String
    },
    instructions: {
        type: String
    },
    description: {
        type: String
    },
    thumb: {
        type: String
    },
    preview: {
        type: String
    },
    time: {
        type: String
    },
    popularity: {
        type: Number
    },
    favorites: {
        type: Array
    },
    likes: {
        type: Array
    },
    youtube: {
        type: String
    },
    tags: {
        type: String
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: null
    },
    ingredients: {
        type: Array
    },
    owner: {
        type: SchemaTypes.ObjectId,
        ref: 'user',
    }
});


const Recipe = model('recipe', recipeSchema);

module.exports = Recipe;