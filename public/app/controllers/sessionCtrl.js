angular.module('sessionCtrl', [])

.controller('sessionController', function($rootScope, $location, Auth) {
  var vm = this;

  vm.loggedIn = Auth.isLoggedIn();

  $rootScope.$on('$routeChangeStart', function() {
    vm.loggedIn = Auth.isLoggedIn();

    // get user info on page load
    Auth.getUser()
      .then(function(data) {
        vm.user = data.data;
        $rootScope.user = data.data;
      });
  });

  vm.doLogin = function() {
    vm.processing = true;
    vm.error = '';

    Auth.login(vm.loginData.email, vm.loginData.password)
      .success(function(data) {
        vm.processing = false;
        if (data.success) {
          $location.path('/dashboard');
        } else {
          vm.error = data.message;
        }
      });
  };

  vm.doLogout = function() {
    Auth.logout();
    vm.user = '';
    $location.path('/login');
  };

});
