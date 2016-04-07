angular.module('dashCtrl', [])

.controller('dashboardController', function($rootScope, Req) {
  var vm = this;

  vm.services = [];
  vm.offers = [];

  vm.display = function() {
    Req.getUserReqs($rootScope.user.id)
      .then(function(data) {
        vm.services = data.data;
        for(let v of vm.services) {
          var a = [];
          Req.countReqBids(v.idServiceRequest)
            .then(function(data) {
              a.push(data.data['count']);
              vm.offers = a;
            });
        }
      });
  }

  vm.display();

});
