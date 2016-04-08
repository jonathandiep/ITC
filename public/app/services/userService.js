angular.module('userService', [])

  .factory('User', function($http) {

    // create new object
    var userFactory = {};

    // get single user
    userFactory.get = function(id) {
      return $http.get('/api/users/' + id);
    };

    userFactory.getUserProfile = function(id) {
      return $http.get('/api/profile/' + id);
    };

    // create a user
    userFactory.create = function(userData) {
      return $http.post('/api/users/', userData);
    };

    // update a user
    userFactory.update = function(id, userData) {
      return $http.put('/api/users/' + id, userData);
    };

    // delete a user
    userFactory.delete = function(id) {
      return $http.delete('/api/users/' + id);
    };

    userFactory.getReviews = function(id) {
      return $http.get('/api/reviews/' + id);
    };

    // return entire userFactory object
    return userFactory;

  });
