const { Schema, model } = require('mongoose');

const userSchema = Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  shopingList: [{ ttl: String, thb: String, id: String, measure: String, recipesId: Array }],
  avatar: {
    type: String,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  }
}, { versionKey: false, timestamps: true });

const User = model('user', userSchema);

module.exports = User;