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
    .when('/dashboard', {
      templateUrl: 'app/views/pages/dashboard.html',
      controller: 'dashboardController',
      controllerAs: 'dash'
    })
    .when('/bidding', {
      templateUrl: 'app/views/pages/bidding.html'
    })
    .when('/profile/edit', {
      templateUrl: 'app/views/pages/profile_edit.html'
    })
    // User
    .when('/signup', {
      templateUrl: 'app/views/pages/user/user_create.html',
      controller: 'userCreateController',
      controllerAs: 'user'
    })
    .when('/user/view', {
      templateUrl: 'app/views/pages/user/user_view.html'
    })
    // Request
    .when('/request/create', {
      templateUrl: 'app/views/pages/request/request_create.html',
      controller: 'serviceReqController',
      controllerAs: 'servReq'
    })
    .when('/request/search', {
      templateUrl: 'app/views/pages/request/request_select.html'
    })
    .when('/request/search/view', {
      templateUrl: 'app/views/pages/search/request_select.html'
    })
    .when('/request/edit', {
      templateUrl: 'app/views/pages/request/request_update.html'
    })
    .when('/request/view', {
      templateUrl: 'app/views/pages/request/request_select.html'
    })
    // Review
    .when('/review/create', {
      templateUrl: 'app/views/pages/review/review_create.html'
    })
    .when('/review/edit', {
      templateUrl: 'app/views/pages/review/review_update.html'
    })
    .when('/review/view', {
      templateUrl: 'app/views/pages/review/review_select.html'
    });

  $locationProvider.html5Mode(true);
}]);
