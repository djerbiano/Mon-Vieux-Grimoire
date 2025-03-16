const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, validateUser } = require("../models/Users");
const { handleErrors } = require("../utils/helpers");

const controllers = {
  // Create user
  registerUser: async (req, res) => {
    try {
      // Validate data
      const { error } = validateUser(req.body);

      if (error) {
        return handleErrors(res, 400, { message: error.details[0].message });
      }

      // Check if email already exists
      const user = await User.findOne({ email: req.body.email });
      if (user)
        return handleErrors(res, 400, {
          message: "Merci de saisir une autre adresse e-mail",
        });

      // Hash password
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password.trim(), salt);

      // Create new user
      const newUser = new User(req.body);
      const result = await newUser.save();

      // response to User
      res.status(201).json({
        message: `${result.email} a bien été créé !`,
      });
    } catch (error) {
      handleErrors(res, 400, {
        message: error.message,
      });
    }
  },

  // Login user
  loginUser: async (req, res) => {
    try {
      // Validate data
      const { error } = validateUser(req.body);

      if (error) {
        return handleErrors(res, 400, { message: error.details[0].message });
      }

      // Check if user exists
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return handleErrors(res, 400, {
          message: "Merci de saisir une autre adresse e-mail",
        });
      }

      // Check password
      const validPassword = await bcrypt.compare(
        req.body.password.trim(),
        user.password
      );

      if (!validPassword) {
        return handleErrors(res, 400, {
          message:
            "Vous avez saisi un mot de passe ou une adresse e-mail incorrect !",
        });
      }

      // Create token
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "5h",
      });

      // response to User
      res.status(200).json({
        userId: user._id,
        token: token,
      });
    } catch (error) {
      handleErrors(res, 400, {
        message: error.message,
      });
    }
  },
};
module.exports = controllers;
