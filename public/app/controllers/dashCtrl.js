angular.module('dashCtrl', [])

.controller('dashboardController', function($rootScope, Req, Bid) {
  var vm = this;

  vm.services = [];
  vm.offers = [];

  vm.display = function() {
    Req.getUserReqs($rootScope.user.id)
      .then(function(data) {
        var info = data.data;
        vm.services = info;
        var a = new Array();
        for(let i = 0; i < info.length; i++) {
          a[i] = null;
          Req.countReqBids(info[i].idServiceRequest)
            .then(function(data) {
              a[i] = data.data.count;
            });
        }
        vm.offers = a;
      });
    Bid.getBids($rootScope.user.id)
      .then(function(data) {
        vm.bids= data.data;
      });
  }

  vm.display();

});
