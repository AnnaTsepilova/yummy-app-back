const { Schema, model, SchemaType, SchemaTypes } = require('mongoose');

const sessionSchema = new Schema({
    uid: Schema.Types.ObjectId
});

const Session = model('Session', sessionSchema);

module.exports = Session;
