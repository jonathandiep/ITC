var User = require('../models/user');
var jwt = require('jsonwebtoken');
var mysql = require('mysql');
var config = require('../../config');

var secret = config.secret;

var pool = mysql.createPool({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.mysqldb
});

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
          return res.json({ success: false, message: 'Account already created with that email.' });
        } else {
          return res.send(err);
        }
      }

      res.json({ message: 'User created!' });

      // get _id from MongoDB and create user in MySQL
      User.findOne({
        email: req.body.email
      }).select('_id').exec((err, user) => {
        if (err) throw err;

        // create user in MySQL
        pool.getConnection(function(err, connection) {
          var post = {idUser: user._id};
          connection.query('INSERT INTO User SET ?', post, function(err, result) {
            if (err) throw err;
            connection.release();
          });
        });

      });

    });

  });

  // route to authenticate users
  api.post('/authenticate', (req, res) => {

    // find user, select first and last name, email, and pass explicitly
    User.findOne({
      email: req.body.email
    }).select('_id firstName lastName email password').exec((err, user) => {
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
            id: user._id,
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

  // API for requests
  // DB table: requests
  //  *GET      /requests => get all requests from user's id (get user_id from params)
  //   POST     /requests => submit/add request (get user_id from params)
  //  *GET      /requests/:request_id => get info about a request
  //   PUT      /requests/:request_id => edit a request
  //   DELETE   /requests/:request_id => delete a request

  // API for bids/quotes
  // DB table: bids
  //   GET      /bids => get all bids from provider (user_id)
  //   POST     /bids => submit a bid
  //   GET      /bids/:bid_id => get info about a bid
  //   PUT      /bids/bid_id => edit a bid
  //   DELETE   /bids/:bid_id => delete a bid


  // API for reviews
  // DB table: reviews
  //  *GET      /reviews => get all reviews from user's id
  //   POST     /reviews => post review (use req.params)
  //  *GET      /reviews/:review_id => get info about a review
  //   PUT      /reviews/:review_id => edit a review
  //   DELETE   /reviews/:review_id => delete a review

  // * => publicly accessible

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
