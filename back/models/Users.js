const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const joi = require("joi");

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 5,
    maxlength: 100,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
  },
});

// UserSchema.plugin(uniqueValidator, { message: '{PATH} doit être unique.' });
UserSchema.plugin(uniqueValidator, { message: "doit être unique" });

const User = mongoose.model("User", UserSchema);

// validate register and login user
function validateUser(obj) {
  const schema = joi.object({
    email: joi.string().trim().min(5).max(100).required().email().messages({
      "string.min": "L'email doit avoir au moins 5 caractères.",
      "string.max": "L'email ne doit pas avoir plus de 100 caractères.",
      "string.email": "L'email doit avoir un format valide.",
    }),
    password: joi.string().trim().min(5).required().messages({
      "string.min": "Le mot de passe doit avoir au moins 5 caractères.",
    }),
  });
  return schema.validate(obj);
}

module.exports = { User, validateUser };
