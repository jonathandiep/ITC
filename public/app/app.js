angular.module('app', [
  'routes',
  'authService',
  'bidService',
  'reqService',
  'reviewService',
  'userService',
  'bidCtrl',
  'dashCtrl',
  'profileCtrl',
  'reviewCtrl',
  'searchCtrl',
  'serviceReqCtrl',
  'sessionCtrl',
  'userCtrl'
])

// application config to integrate token into requests
.config(function($httpProvider) {

  // attach authInterceptor to HTTP requests
  $httpProvider.interceptors.push('AuthInterceptor');
});
