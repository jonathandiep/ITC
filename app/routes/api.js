var User = require('../models/user');
var jwt = require('jsonwebtoken');
var config = require('../../config');

var secret = config.secret;

module.exports = function(app, express) {

  // make instance of express router (used for API)
  var api = express.Router();

  api.post('/users', (req, res) => {
    var user = new User();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.password = req.body.password;

    user.save((err) => {
      if (err) {
        if (err.code == 11000) {
          return res.json({ success: false, message: 'User already exists.' });
        } else {
          return res.send(err);
        }
      }

      res.json({ message: 'User created!' });
    });
  });

  // route to authenticate users
  api.post('/authenticate', (req, res) => {

    // find user, select first and last name, email, and pass explicitly
    User.findOne({
      email: req.body.email
    }).select('firstName lastName email password').exec((err, user) => {
      if (err) throw err;

      if (!user) {
        res.json({
          success: false,
          message: 'Authentication failed. User not found.'
        });
      } else if (user) {

        // check if password matches
        var validPass = user.comparePassword(req.body.password);
        if (!validPass) {
          res.json({
            success: false,
            message: 'Authentication failed. Wrong username or password.'
          });
        } else {

          // create token
          var token = jwt.sign({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
          }, config.secret, {
            expiresIn: '2d' // expires in 2 days
          });

          res.json({
            success: true,
            message: 'Here\'s your token!',
            token: token
          });
        }
      }
    });
  });

  // middleware to verify a token
  api.use((req, res, next) => {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    //decode token
    if (token) {

      // verify secret and check exp
      jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
          return res.status(403).send({
            success: false,
            message: 'Failed to authenticate token.'
          });
        } else {

          // if everything is good, save to request for use in other routes
          req.decoded = decoded;
          next();
        }
      })
    } else {

      // if no token, HTTP 403 (access forbidden)
      return res.status(403).send({
        success: false,
        message: 'No token provided.'
      });
    }
  });

  api.get('/me', (req, res) => {
    res.send(req.decoded);
  });

  // get all users (GET /api/users)
  api.get('/users', (req, res) => {
    User.find((err, users) => {
      if (err) res.send(err);

      res.json(users);
    });
  });

  // routes that end in /api/users/:user_id
  api.route('/users/:user_id')

    // used to get a user (GET /api/users/:user_id)
    .get((req, res) => {
      User.findById(req.params.user_id, (err, user) => {
        if (err) res.send(err);

        res.json(user);
      });
    })

    // used to update a user (PUT /api/users/:user_id)
    .put((req, res) => {
      User.findById(req.params.user_id, (err, user) => {
        if (err) res.send(err);

        // update ONLY new user information
        if (req.body.firstName) user.firstName = req.body.firstName;
        if (req.body.lastName) user.lastName = req.body.lastName;
        if (req.body.email) user.email = req.body.email;
        if (req.body.password) user.password = req.body.password;

        // save the user
        user.save((err) => {
          if (err) res.send(err);

          res.json({ message: 'User updated!' });
        });
      });
    })

    // used to delete a user (DELETE /api/users/:user_id)
    .delete((req, res) => {
      User.remove({
        _id: req.params.user_id
      }, (err, user) => {
        if (err) return res.send(err);

        res.json({ message: 'Successfully deleted.' });
      });
    });

  return api;
};
