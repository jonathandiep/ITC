angular.module('dashCtrl', [])

.controller('dashboardController', function($rootScope, $location, $window, Req, Bid, User, Review) {
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

    User.getUserProfile($rootScope.user.id)
      .then(function(data) {
        vm.profile = data.data;
      })

    Review.getReviewStatistics($rootScope.user.id)
      .then(function(data) {
        vm.statistics = data.data;
      })
  }

  vm.display();

  // vm.deleteBid()
  vm.deleteBid = function(bidID) {
    Bid.deleteBid(bidID)
      .then(function(data) {
        vm.display();
      });
  };

  vm.search = function(query) {
    if (query) {
      $location.path('/request/search/' + query);
    } else {
      $window.alert('Cannot submit an empty search!');
    }
  }
});
