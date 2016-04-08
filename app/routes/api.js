var User = require('../models/user');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
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

      //res.json({ message: 'User created!' });

      // get _id from MongoDB and create user in MySQL
      User.findOne({
        email: req.body.email
      }).select('_id firstName lastName').exec((err, user) => {
        if (err) throw err;

        // create user in MySQL
        pool.getConnection((err, connection) => {
          var post = {idUser: user._id, firstName: user.firstName, lastName: user.lastName};
          connection.query("INSERT INTO User SET ?", post, (err, result) => {
            if (err) throw err;
            connection.release();
          });
        });

      });

    res.json({ message: 'User created!' });
    });

  });

  // used to get a user (GET /api/users/:user_id)
  api.get('/users/:user_id', (req, res) => {
    User.findById(req.params.user_id, (err, user) => {
      if (err) res.send(err);

      res.json(user);
    });
  })

  api.get('/profile/:userID', (req, res) => {
    var id = req.params.userID;
    pool.getConnection((err, connection) => {
      var sqlQuery = "SELECT * FROM User WHERE idUser = ?";
      connection.query(sqlQuery, [id], (err, result) => {
        if (err) throw err;
        connection.release();
        res.send(result[0]);
      });
    });
  });

  // GET /requests?q=searchquery => get all requests (search params here)
  api.get('/requests', (req, res) => {
    if (req.query.q) {
      pool.getConnection((err, connection) => {
        var searchQuery = '%' + req.query.q + '%';
        var sqlQuery = "SELECT * FROM ServiceRequest LEFT JOIN User ON ServiceRequest.clientID = User.idUser WHERE (serviceTitle LIKE ? OR description LIKE ?) AND serviceStatus = 'Open'";
        connection.query(sqlQuery, [searchQuery, searchQuery], (err, results) => {
          if (err) throw err;
          connection.release();
          res.send(results);
        });
      });
    } else {
      pool.getConnection((err, connection) => {
        connection.query('SELECT * FROM ServiceRequest', (err, results) => {
          if (err) throw err;
          connection.release();
          res.send(results);
        })
      })
    }
  });

  // GET /requests/:request_id => get info about a specific request
  api.get('/requests/:request_id', (req, res) => {
    pool.getConnection((err, connection) => {
      var requestID = req.params.request_id;
      var sqlQuery = "SELECT * FROM ServiceRequest LEFT JOIN User ON ServiceRequest.clientID = User.idUser WHERE idServiceRequest = ?";
      connection.query(sqlQuery, [requestID], (err, results) => {
        if (err) throw err;
        connection.release();
        if (typeof results[0] === 'undefined') res.send('Error. Request not found :(');
        res.send(results[0])
      });
    });
  });

  // GET /requests/user/:user_id => get all requests from user's id
  api.get('/requests/user/:user_id', (req, res) => {
    pool.getConnection((err, connection) => {
      var userID = req.params.user_id;
      var sqlQuery = "SELECT * FROM ServiceRequest WHERE clientID = ?";
      connection.query(sqlQuery, [userID], (err, results) => {
        if (err) throw err;
        connection.release();
        res.send(results);
      });
    });
  });

  api.get('/requests/count/:request_id', (req, res) => {
    var id = req.params.request_id;
    pool.getConnection((err, connection) => {
      var sqlQuery = "SELECT COUNT(*) AS C FROM Bid WHERE serviceRequestID = ?";
      connection.query(sqlQuery, [id], (err, result) => {
        if (err) throw err;
        connection.release();
        res.json({
          count: result[0]["C"]
        });
      });
    });
  });


  // GET /reviews?reviewer=reviewerID&reviewee=revieweeID => get reviews (params: reviewerID & revieweeID)
  api.get('/reviews/:revieweeID', (req, res) => {
    /*
    if (req.body.reviewer) {
      pool.getConnection((err, connection) => {
        var reviewer = req.query.reviewer;
        var sqlQuery = "SELECT * FROM Review WHERE reviewerID = ?";
        connection.query(sqlQuery, [reviewer], (err, results) => {
          if (err) throw err;
          connection.release();
          res.send(results);
        });
      });
      */
    if (req.params.revieweeID) {
      pool.getConnection((err, connection) => {
        var reviewee = req.params.revieweeID;
        var sqlQuery = "SELECT * FROM Review LEFT JOIN USER ON Review.revieweeID = User.idUser INNER JOIN ServiceRequest ON Review.serviceRequestID = ServiceRequest.idServiceRequest WHERE revieweeID = ?";
        connection.query(sqlQuery, [reviewee], (err, results) => {
          if (err) throw err;
          connection.release();
          res.send(results);
        });
      });
    } else {
      res.json({
        success: false,
        message: 'Review needs parameters.'
      });
    }
  });

  // GET /reviews/:review_id => get info about a review
  api.get('/reviews/:review_id', (req, res) => {
    pool.getConnection((err, connection) => {
      var id = req.params.review_id;
      var sqlQuery = "SELECT * FROM Review WHERE idReview = ?";
      connection.query(sqlQuery, [id], (err, result) => {
        if (err) throw err;
        connection.release();
        res.send(result[0]);
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
  // DB table: ServiceRequest
  //  -GET      /requests?q=searchquery => get all requests (search params here)
  //  -GET      /requests/:request_id => get info about a request
  //  -GET      /requests/user/:user_id => get all requests from user's id
  //  -POST     /requests => submit/add request (get user_id from params)
  //   PUT      /requests/:request_id => edit a request
  //   DELETE   /requests/:request_id => delete a request

  // POST /requests => submit/add request (get user_id from params)
  api.post('/requests', (req, res) => {
    var clientID = req.query.clientID;
    var serviceTitle = req.body.serviceTitle;
    var description = req.body.description;
    var status = 'Open';
    var date = new Date().toISOString().slice(0, 19).replace('T', ' ');

    pool.getConnection((err, connection) => {
      var post = {clientID: clientID, serviceTitle: serviceTitle, description: description, serviceStatus: status, date: date};
      connection.query("INSERT INTO ServiceRequest SET ?", post, (err, result) => {
        if (err) throw err;
        connection.release();
        res.json({
          success: true,
          message: 'Request submitted.'
        });
      });
    });

  });

  api.route('/requests/:request_id')

    // PUT /requests/:request_id => edit a request
    .put((req, res) => {
      // needs to get idServiceRequest to edit
      var id = req.params.request_id;
      var serviceTitle = req.body.serviceTitle;
      var description = req.body.description;
      var status = req.body.serviceStatus;
      pool.getConnection((err, connection) => {
        var sqlQuery = "UPDATE ServiceRequest SET serviceTitle = ?, description = ?, serviceStatus = ? WHERE idServiceRequest = ?";
        connection.query(sqlQuery, [serviceTitle, description, status, id], (err, result) => {
          if (err) throw err;
          connection.release();
          res.json({
            success: true,
            message: 'Request updated.'
          });
        });
      });
    })

    // DELETE /requests/:request_id => delete a request
    .delete((req, res) => {
      var id = req.params.request_id;
      pool.getConnection((err, connection) => {
        var sqlQuery = "DELETE FROM ServiceRequest WHERE idServiceRequest = ?";
        connection.query(sqlQuery, [id], (err, result) => {
          if (err) throw err;
          connection.release();
          res.json({
            success: true,
            message: 'Request deleted.'
          });
        });
      });
    });



  // API for bids/quotes
  // DB table: Bid
  //   GET      /bids?provider=providerID&service=serviceRequestID => get all bids (params: providerID & service)
  //   GET      /bids/:bid_id => get info about a specific bid
  //   POST     /bids => submit a bid
  //   PUT      /bids/:bid_id => edit a bid
  //   DELETE   /bids/:bid_id => delete a bid

  api.route('/bids')

    // GET /bids?provider=providerID&service=serviceRequestID => get bids (params: providerID & service)
    .get((req, res) => {
      if (req.query.provider) {
        var provider = req.query.provider;
        pool.getConnection((err, connection) => {
          var sqlQuery = "SELECT * FROM Bid LEFT JOIN ServiceRequest ON Bid.serviceRequestID = ServiceRequest.idServiceRequest INNER JOIN USER ON ServiceRequest.clientID = User.idUser WHERE providerID = ?";
          connection.query(sqlQuery, [provider], (err, result) => {
            if (err) throw err;
            connection.release();
            res.send(result);
          });
        });
      } else if (req.query.service) {
        var service = req.query.service;
        pool.getConnection((err, connection) => {
          var sqlQuery = "SELECT * FROM Bid LEFT JOIN User ON Bid.providerID = User.idUser WHERE serviceRequestID = ? AND bidStatus = 'Accepted'";
          connection.query(sqlQuery, [service], (err, result) => {
            if (err) throw err;
            connection.release();
            res.send(result[0]);
          });
        });
      } else {
        res.json({
          success: false,
          message: 'Error. Needs parameters.'
        });
      }
    })

    // POST /bids => submit a bid
    .post((req, res) => {
      var service = req.query.service;
      var provider = req.body.provider;
      var priceType = req.body.priceType;
      var priceValue = req.body.priceValue;
      var note = req.body.note;
      var status = 'Pending';
      var date = new Date().toISOString().slice(0, 19).replace('T', ' ');
      pool.getConnection((err, connection) => {
        var post = {serviceRequestID: service, providerID: provider, priceType: priceType, priceValue: priceValue, note: note, bidStatus: status, bidDate: date};
        var sqlQuery = "INSERT INTO Bid SET ?";
        connection.query(sqlQuery, post, (err, result) => {
          if (err) throw err;
          connection.release();
          res.json({
            success: true,
            message: 'Bid posted.'
          });
        });
      });
    });

  api.route('/bids/:bid_id')

    // GET /bids/:bid_id => get info about a specific bid
    .get((req, res) => {
      var id = req.params.bid_id;
      if (req.query.status) {
        var status = req.query.status;
        pool.getConnection((err, connection) => {
          var sqlQuery = "SELECT * FROM Bid LEFT JOIN User ON Bid.providerID = User.idUser WHERE serviceRequestID = ? AND bidStatus = ? ";
          connection.query(sqlQuery, [id, status], (err, result) => {
            if (err) throw err;
            connection.release();
            res.send(result);
          });
        });
      } else {
        pool.getConnection((err, connection) => {
          var sqlQuery = "SELECT * FROM Bid LEFT JOIN ServiceRequest ON Bid.serviceRequestID = ServiceRequest.idServiceRequest WHERE idBid = ? ";
          connection.query(sqlQuery, [id], (err, result) => {
            if (err) throw err;
            connection.release();
            res.send(result);
          });
        });
      }

    })

    // PUT /bids/:bid_id => edit a bid
    .put((req, res) => {
      var id = req.params.bid_id;
      var priceType = req.body.priceType;
      var priceValue = req.body.priceValue;
      var note = req.body.note;
      var status = req.body.bidStatus;
      if (status === 'Accepted') {
        var servReqID = req.body.serviceRequestID;
        pool.getConnection((err, connection) => {
          var sqlQuery = "UPDATE Bid SET bidStatus = ? WHERE idBid = ?";
          var sqlQuery2 = "UPDATE Bid SET bidStatus = ? WHERE idBid != ? AND serviceRequestID = ?";
          connection.query(sqlQuery, ['Accepted', id], (err, result) => {
            if (err) throw err;
            connection.query(sqlQuery2, ['Declined', id, servReqID], (err, result) => {
              if (err) throw err;
              connection.release();
              res.json({
                success: true,
                message: 'Accepted bid.'
              });
            });
          });
        });
      } else {
        pool.getConnection((err, connection) => {
          var sqlQuery = "UPDATE Bid SET priceType = ?, priceValue = ?, note = ?, bidStatus = ? WHERE idBid = ?";
          connection.query(sqlQuery, [priceType, priceValue, note, status, id], (err, result) => {
            if (err) throw err;
            connection.release();
            res.json({
              success: true,
              message: 'Bid updated.'
            });
          });
        });
      }
    })

    // DELETE /bids/:bid_id => delete a bid
    .delete((req, res) => {
      var id = req.params.bid_id;
      pool.getConnection((err, connection) => {
        connection.query("DELETE FROM Bid WHERE idBid = ?", [id], (err, results) => {
          if (err) throw err;
          connection.release();
          res.json({
            success: true,
            message: 'Bid deleted.'
          });
        });
      });
    });

  // API for reviews
  // DB table: Review
  //   GET      /reviews?reviewer=reviewerID&reviewee=revieweeID => get reviews (params: reviewerID & revieweeID)
  //   GET      /reviews/:review_id => get info about a review
  //   POST     /reviews => submit a review (use req.params)
  //   PUT      /reviews/:review_id => edit a review
  //   DELETE   /reviews/:review_id => delete a review

  // POST /reviews => submit a review
  api.post('/reviews', (req, res) => {
    var reqID = req.body.reqID;
    var reviewAs = req.body.reviewAs;
    var reviewer = req.body.reviewer;
    var reviewee = req.body.reviewee;
    var rating = req.body.rating;
    var heading = req.body.heading;
    var message = req.body.message;
    var reviewDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    pool.getConnection((err, connection) => {
      var post = {serviceRequestID: reqID, reviewAs: reviewAs, reviewerID: reviewer, revieweeID: reviewee, rating: rating, heading: heading, message: message, reviewDate: reviewDate};
      connection.query("INSERT INTO Review SET ?", post, (err, result) => {
        if (err) throw err;
        connection.release();
        res.json({
          success: true,
          message: 'Review submitted!'
        });
      });
    });
  });

  // GET /reviews/:review_id => returns total amount of reviews and avg of a review.
  api.get('/reviews/stats/:reviewee_id', (req, res) => {
    var revieweeID = req.params.reviewee_id;
    pool.getConnection((err, connection) => {
      var sqlQuery = "SELECT COUNT(*) AS total, AVG(rating) AS avg FROM Review WHERE revieweeID = ?";
      connection.query(sqlQuery, [revieweeID], (err, result) => {
        if (err) throw err;
        connection.release();
        res.send(result[0]);
      });
    });
  });

  api.route('/reviews/:review_id')

    // PUT /reviews/:review_id => edit a review
    .put((req, res) => {
      var id = req.params.review_id;
      var rating = req.body.rating;
      var message = req.body.message;
      pool.getConnection((err, connection) => {
        var sqlQuery = "UPDATE Review SET rating = ?, message = ? WHERE idReview = ?";
        connection.query(sqlQuery, [rating, message, id], (err, result) => {
          if (err) throw err;
          connection.release();
          res.json({
            success: true,
            message: 'Review updated.'
          });
        });
      });
    })

    // DELETE /reviews/:review_id => delete a review
    .delete((req, res) => {
      var id = req.params.review_id;
      pool.getConnection((err, connection) => {
        var sqlQuery = "DELETE FROM Review WHERE idReview = ?";
        connection.query(sqlQuery, [id], (err, result) => {
          if (err) throw err;
          connection.release();
          res.json({
            success: true,
            message: 'Review deleted.'
          });
        });
      });
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
        });

      });
      pool.getConnection((err, connection) => {
        var id = req.params.user_id;
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var address = req.body.address;
        var phone = req.body.phone;
        var sqlQuery = "UPDATE User SET firstName = ?, lastName = ?, address = ?, phone = ? WHERE idUser = ?";
        connection.query(sqlQuery, [firstName, lastName, address, phone, id], (err, result) => {
          if (err) throw err;
          connection.release();
          res.json({
            success: true,
            message: 'User updated!'
          });
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
