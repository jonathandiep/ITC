angular.module('profileCtrl', [])

.controller('viewProfileController', function($routeParams, User) {
  var vm = this;

  // get User's info


  User.get($routeParams.user_id)
    .then(function(data) {
      vm.profileData = data.data;
    })

  User.getUserProfile($routeParams.user_id)
    .then(function(data) {
      vm.additionalData = data.data;
      console.log(data.data);
    })

  User.getReviews($routeParams.user_id)
    .then(function(data) {
      vm.reviews = data.data;
      console.log(data.data);
    })
});
