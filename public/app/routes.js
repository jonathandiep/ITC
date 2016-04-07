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
    // Offer
    .when('/offer/update', {
      templateUrl: 'app/views/pages/offer/offer_update.html'
    })
    // Request
    .when('/request/create', {
      templateUrl: 'app/views/pages/request/request_create.html',
      controller: 'submitServReqController',
      controllerAs: 'servReq'
    })
    .when('/request/search', {
      templateUrl: 'app/views/pages/request/request_search.html'
    })
    .when('/request/search/view', {
      templateUrl: 'app/views/pages/search/request_select.html'
    })
    .when('/request/edit/:id', {
      templateUrl: 'app/views/pages/request/request_update.html',
      controller: 'editServReqController',
      controllerAs: 'servReq'
    })
    .when('/request/view/:id', {
      templateUrl: 'app/views/pages/request/request_select.html',
      controller: 'getServReqController',
      controllerAs: 'servReq'
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
    })
    // Search
    .when('/request/search/view', {
      templateUrl: 'app/views/pages/offer/offer_update.html'
    });

  $locationProvider.html5Mode(true);
}]);
