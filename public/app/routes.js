angular.module('routes', ['ngRoute'])

.config(['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) => {
  $routeProvider
    .when('/', {
      templateUrl: 'app/views/pages/home.html'
    })
    .when('/login', {
      templateUrl: 'app/views/pages/login.html',
      controller: 'sessionController',
      controllerAs: 'session'
    })
    .when('/signup', {
      templateUrl: 'app/views/pages/signup.html',
      controller: 'userCreateController',
      controllerAs: 'user'
    })
    .when('/profile', {
      templateUrl: 'app/views/pages/user_profile.html'
    })
    .when('/dashboard', {
      templateUrl: 'app/views/pages/dashboard.html'
    })
    .when('/bidding', {
      templateUrl: 'app/views/pages/bidding.html'
    })
    .when('/client/review', {
      templateUrl: 'app/views/pages/client_review.html'
    })
    .when('/request/id/update', {
      templateUrl: 'app/views/pages/request_update.html'
    });

  $locationProvider.html5Mode(true);
}]);
