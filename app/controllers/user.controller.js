const User = require('../models/user.model.js');
const genUserResponse = require('../helper/responseGenerator.js');
const crypto = require("crypto");
// Create and Save a new User
exports.signup = (req, res) => {
  // Validate request
  if(!req.body.name || !req.body.password || !req.body.email) {
      return res.status(400).send({
          message: "User content can not be empty"
      });
  }
  User.findOne({
    email: req.body.email,
  },
  (error, isExistingUser) => {
    if (error) {
      return res.status(400).send({
          message: "Query Error"
      });
    }
    if (isExistingUser) {
      return res.status(400).send({
          message: "User Name and email combination already found"
      });
    }
  });
  // Create a User
  const user = new User({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
      isLoggedIn: true,
      authToken: crypto.randomBytes(20).toString('hex'),
  });

  // Save User in the database
  user.save()
  .then(data => {
    const responseObject = genUserResponse(user);
    res.send(responseObject);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while Registering the User."
      });
  });
};

// Login a user identified by the userId in the request
exports.logIn = (req, res) => {
  console.log(req);
  if (!req.body.email || !req.body.password) {
      return res.status(400).send({
          message: "User login info can not be empty"
      });
  }
  // Find user and update login information
  User.findOneAndUpdate(
    {
      email: req.body.email,
      password: req.body.password,
    },
    {
      isLoggedIn: true,
      authToken: crypto.randomBytes(20).toString('hex'),
    },
    {
      new: true,
    },
    (error, user) => {
      if (error) {
        if(error.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with given credentials"
            });
        }
        return res.status(500).send({
            message: "Error occurred logging in user "
        });
      }

      if (!user) {
          return res.status(404).send({
              message: "User not found"
          });
      }
      const responseObject = genUserResponse(user);
      res.send(responseObject);
    });
};

// Chheck If Already LoggedIn
exports.checkIsLoggedIn = (req, res) => {
  User.findOne({
    email: req.body.email,
    // authToken: req.body.authToken,
  },
  (error, user) => {
    if (error) {
      return res.status(400).send({
          message: "Query Error"
      });
    }
    if (!user) {
        return res.status(404).send({
            message: "User not found"
        });
    }
    if (user.authToken !== req.body.authToken) {
      responseObject = {
        email: req.body.email,
        message: 'Invalid Authentication',
        isLoggedIn: false,
      };
    } else {
      responseObject = {
        email: req.body.email,
        message: 'Authentication Valid',
        isLoggedIn: true,
      };
    }
    res.send(responseObject);
  });
};

// Logout a user identified by the userId in the request
exports.logOut = (req, res) => {
  // Find user and update login information
  User.findOneAndUpdate(
    {
      email: req.body.email,
      authToken: req.body.authToken,
    },
    {
      isLoggedIn: false,
      authToken: null,
    },
    {
      new: true,
    },
    (error, user) => {
      if (error) {
        console.log(error);
        if(error.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not authenticated"
            });
        }
        return res.status(500).send({
            message: "Error occurred logging out user "
        });
      }

      if (!user) {
          return res.status(404).send({
              message: "User not found"
          });
      }
      const responseObject = genUserResponse(user);
      res.send(responseObject);
    });
};
