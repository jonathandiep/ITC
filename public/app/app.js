angular.module('app', [
  'routes',
  'authService',
  'bidService',
  'reqService',
  'userService',
  'bidCtrl',
  'dashCtrl',
  'serviceReqCtrl',
  'sessionCtrl',
  'userCtrl'
])

// application config to integrate token into requests
.config(function($httpProvider) {

  // attach authInterceptor to HTTP requests
  $httpProvider.interceptors.push('AuthInterceptor');
});
