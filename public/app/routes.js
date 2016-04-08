angular.module('routes', ['ngRoute'])

.config(['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) => {
  $routeProvider
    .when('/', {
      templateUrl: 'app/views/pages/home.html',
      controller: 'homeController',
      controllerAs: 'home'
    })
    .when('/browse', {
      templateUrl: 'app/views/pages/request/request_browse.html',
      controller: 'browseController',
      controllerAs: 'browse'
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
    .when('/profile/edit/:user_id', {
      templateUrl: 'app/views/pages/user/user_update.html',
      controller: 'editProfileController',
      controllerAs: 'profile'
    })
    .when('/user/view/:user_id', {
      templateUrl: 'app/views/pages/user/user_view.html',
      controller: 'viewProfileController',
      controllerAs: 'profile'
    })
    // Offer
    .when('/offer/update/:bid_id', {
      templateUrl: 'app/views/pages/offer/offer_update.html',
      controller: 'editBidController',
      controllerAs: 'bid'
    })
    // Request
    .when('/request/create', {
      templateUrl: 'app/views/pages/request/request_create.html',
      controller: 'submitServReqController',
      controllerAs: 'servReq'
    })
    .when('/request/search/:query', {
      templateUrl: 'app/views/pages/request/request_search.html',
      controller: 'searchController',
      controllerAs: 'search'
    })
    .when('/request/search/bid/:request_id', {
      templateUrl: 'app/views/pages/offer/offer_post.html',
      controller: 'searchBidController',
      controllerAs: 'search'
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
    .when('/review/create/:req_id', {
      templateUrl: 'app/views/pages/review/review_create.html',
      controller: 'postReviewController',
      controllerAs: 'review'
    })
    .when('/review/edit', {
      templateUrl: 'app/views/pages/review/review_update.html'
    })

  $locationProvider.html5Mode(true);
}]);
