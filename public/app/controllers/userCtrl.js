angular.module('userCtrl', ['userService'])

.controller('userCreateController', function($location, User) {
  var vm = this;

  vm.saveUser = function() {
    vm.processing = true;
    vm.message = '';

    User.create(vm.userData)
      .success(function(data) {
        vm.processing = false;

        // clear the form
        vm.userData = {};
        $location.path('/login');
        vm.message = data.message;
        console.log(data.message);
      });
  };

});
