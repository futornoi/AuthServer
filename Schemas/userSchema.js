const {Schema, model} = require('mongoose');


const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 4,
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  imgSrc: {
    type: String,
    default: '',
  },
  roles: [{type: String, ref: 'Role'}]
}, {
  versionKey: false,
})

module.exports = model('User', UserSchema);