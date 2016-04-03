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

/*
.controller('userEditController', function($routeParams, User) {
  var vm = this;

  //variable to hide/show elements of the view
  // differentiates between create/edit pages
  vm.type = 'edit';

  // get the user data for the user you want to edit
  // $routeParams is the way we grab data from the url
  User.get($routeParams.user_id)
    .success(function(data) {
      vm.userData = data;
    });

  // function to save the user
  vm.saveUser = function() {
    vm.processing = true;
    vm.message = '';

    // call the userService function to updater
    User.update($routeParams.user_id, vm.userData)
      .success(function(data) {
        vm.processing = false;

        vm.userData = {};
        vm.message = data.message;
      })
  }

})

.controller('userDeleteController', function(User) {
  var vm = this;

  //vm.processing = true;

  vm.deleteUser = function(id) {
    vm.processing = true;

    User.delete(id)
      .success(function(data) {
        // stuff here
      })
  }
})
*/
