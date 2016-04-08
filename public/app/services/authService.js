angular.module('authService', [])

  // auth factory to login and get information
  .factory('Auth', function($http, $q, AuthToken) {
    var authFactory = {};

    authFactory.login = function(email, password) {

      // return the promise object and its data
      return $http.post('/api/authenticate', {
        email: email,
        password: password
      })
        .success(function(data) {
          AuthToken.setToken(data.token);
          return data;
        });
    };

    authFactory.logout = function() {
      AuthToken.setToken();
    };

    authFactory.isLoggedIn = function() {
      if (AuthToken.getToken()) {
        return true;
      } else {
        return false;
      }
    };

    authFactory.getUser = function() {
      if (AuthToken.getToken()) {
        return $http.get('/api/me');
      } else {
        return $q.reject({ message: 'User has no token.' });
      }
    };

    return authFactory;
  })

  // factory for handling tokens
  .factory('AuthToken', function($window) {
    var authTokenFactory = {};

    // get token out of local storage
    authTokenFactory.getToken = function() {
      return $window.localStorage.getItem('token');
    };

    // function to set/clear token
    authTokenFactory.setToken = function(token) {
      if (token) {
        $window.localStorage.setItem('token', token);
      } else {
        $window.localStorage.removeItem('token');
      }
    };

    return authTokenFactory;
  })

  // app configuration to integrate tokens into requests
  .factory('AuthInterceptor', function($q, $location, AuthToken) {
    var interceptorFactory = {};

    interceptorFactory.request = function(config) {
      var token = AuthToken.getToken();

      if (token) {
        config.headers['x-access-token'] = token;
      }

      return config;
    };

    interceptorFactory.responseError = function(response) {

      // if server returns 403 forbidden response
      if (response.status == 403) {
        AuthToken.setToken();
        $location.path('/login');
      }

      // return the errors from the server as a promise
      return $q.reject(response);
    }

    return interceptorFactory;
  });
