angular.module('routes', ['ngRoute'])

.config(['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) => {
  $routeProvider
    .when('/', {
      templateUrl: 'app/views/pages/home.html'
    })
    // Authentication
    .when('/login', {
      templateUrl: 'app/views/pages/login.html',
      controller: 'sessionController',
      controllerAs: 'session'
    })
    .when('/signup', {
      templateUrl: 'app/views/pages/user_create.html',
      controller: 'userCreateController',
      controllerAs: 'user'
    })
    .when('/dashboard', {
      templateUrl: 'app/views/pages/dashboard.html'
    })
    .when('/bidding', {
      templateUrl: 'app/views/pages/bidding.html'
    })
    // Profile
    .when('/profile', {
      templateUrl: 'app/views/pages/profile_view.html'
    })
    .when('/profile/edit', {
      templateUrl: 'app/views/pages/profile_edit.html'
    })
    // Request
    .when('/request/create', {
      templateUrl: 'app/views/pages/request_create.html'
    })
    .when('/request/view', {
      templateUrl: 'app/views/pages/request_view.html'
    })
    .when('/request/update', {
      templateUrl: 'app/views/pages/request_update.html'
    })
    // Review
    .when('/review/view', {
      templateUrl: 'app/views/pages/review_view.html'
    })
    .when('/review/create', {
      templateUrl: 'app/views/pages/review_create.html'
    })
    .when('/review/edit', {
      templateUrl: 'app/views/pages/review_update.html'
    });

  $locationProvider.html5Mode(true);
}]);
