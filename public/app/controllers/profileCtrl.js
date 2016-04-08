angular.module('profileCtrl', [])

.controller('viewProfileController', function($routeParams, User) {
  var vm = this;

  // get User's info

  User.get($routeParams.user_id)
    .then(function(data) {
      vm.profileData = data.data;
      console.log(data.data);
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
      vm.reviewCount = [];
      for(let i = 0; i < vm.reviews.length; i++) {
        vm.reviewCount.push(Number(vm.reviews[i].rating));
        vm.reviews[i].rating = Number(vm.reviews[i].rating);
      }
      console.log(vm.reviewCount);
    })
})

.controller('editProfileController', function($routeParams, $location, User, Auth) {
  var vm = this;

  User.get($routeParams.user_id)
    .then(function(data) {
      vm.profileData = data.data;
    })

  User.getUserProfile($routeParams.user_id)
    .then(function(data) {
      vm.additionalData = data.data;
    })

  vm.update = function() {
    vm.entireProfile = {
      firstName: vm.profileData.firstName,
      lastName: vm.profileData.lastName,
      email: vm.profileData.email,
      password: vm.profileData.password,
      address: vm.additionalData.address,
      phone: vm.additionalData.phone
    };

    console.log(vm.entireProfile);

    User.update($routeParams.user_id, vm.entireProfile)
      .then(function(data) {
        Auth.getUser(function(data) {
          console.log(data);
        })
        $location.path('/dashboard');
      });
  }

});
