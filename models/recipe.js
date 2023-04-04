const { Schema, model, SchemaType, SchemaTypes } = require('mongoose');

const recipeSchema = new Schema({
    title: { type: String },
    category: { type: String },
    area: { type: String },
    instructions: { type: String },
    description: { type: String },
    thumb: { type: String },
    preview: { type: String },
    time: { type: String },
    popularity: { type: Number },
    favorites: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    ingredients: {
        type: Array
    },
    youtube: { type: String },
    tags: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    owner: {
        type: SchemaTypes.ObjectId,
        ref: 'user',
    }
});

const Recipe = model('Recipe', recipeSchema);

module.exports = Recipe;
