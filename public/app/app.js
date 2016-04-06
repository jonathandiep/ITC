angular.module('app', [
  'routes',
  'authService',
  'reqService',
  'userService',
  'dashCtrl',
  'sessionCtrl',
  'userCtrl'
])

// application config to integrate token into requests
.config(function($httpProvider) {

  // attach authInterceptor to HTTP requests
  $httpProvider.interceptors.push('AuthInterceptor');
});
