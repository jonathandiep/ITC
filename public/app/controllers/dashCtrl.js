angular.module('dashCtrl', [])

.controller('dashboardController', function($rootScope, Auth, Req) {
  var vm = this;

  vm.services = [];
  vm.offers = [];

  Req.getUserReqs($rootScope.user.id)
    .then(function(data) {
      vm.services = data.data;
      for(let v of vm.services) {
        var a = [];
        Req.countReqBids(v.idServiceRequest)
          .then(function(data) {
            console.log('bid: ' + data.data['count']);
            a.push(data.data['count']);
            vm.offers = a;
            console.log(vm.offers);
          });
      }
    });

});
