angular.module('serviceReqCtrl', [])

.controller('submitServReqController', function($rootScope, $location, Req) {
  var vm = this;

  vm.submitServiceReq = function() {
    Req.makeReq(vm.formData)
      .success(function(data) {
        vm.formData = {};
        $location.path('/dashboard');
        console.log(data.message);
      });
  };

})

.controller('getServReqController', function($routeParams, $window, Req) {
  var vm = this;

  vm.getServReq = function() {
    var id = $routeParams.id;
    Req.getReq(id)
      .success(function(data) {
        //console.log(data);
        vm.servReqData = data;
        if (vm.servReqData.serviceStatus === 'Open') {
          Req.getBids(id, 'Pending')
            .success(function(data) {
              console.log(data);
              vm.bidData = data;
            });
        } else {
          Req.getBids(id, 'Accepted')
            .success(function(data) {
              vm.bidData = data;
            });
        }

      });

  };

  // vm.acceptBid(servReqID, bidID) => accept Bid
  //   - change request status to closed
  //   - change bid status to Accepted, all other bid status for the same service to Rejected
  vm.acceptBid = function(bid) {
    bid.bidStatus = 'Accepted';
    Req.changeBidStatus(bid.idBid, bid, $routeParams.id)
      .success(function(data) {
        console.log('Accepted');
      });
    var id = $routeParams.id;
    vm.servReqData.serviceStatus = 'Closed';
    Req.editReq(id, vm.servReqData)
      .success(function(data) {
        console.log(data.message);
      });

    vm.getServReq();
  };

  // vm.rejectBid(servReqID, bidID) => reject bid
  //  - change bid status to Rejected
  vm.rejectBid = function(bid) {
    bid.bidStatus = 'Declined';
    Req.changeBidStatus(bid.idBid, bid, $routeParams.id)
      .success(function(data) {
        console.log('Declined');
      });
    vm.getServReq();
  };

  vm.getServReq();

  vm.back = function() {
    $window.history.back();
  }

})

.controller('editServReqController', function($routeParams, $location, Req) {
  var vm = this;

  vm.getServReq = function() {
    var id = $routeParams.id;
    Req.getReq(id)
      .success(function(data) {
        vm.servReqData = data;
        vm.selected = vm.servReqData.serviceStatus === 'Open' ? vm.options[0] : vm.options[1];
      });
  };

  vm.getServReq();

  vm.options = [
    {
      name: 'Open',
      value: 'Open'
    },
    {
      name: 'Closed',
      value: 'Closed'
    }
  ];

  vm.editServReq = function() {
    var id = $routeParams.id;
    vm.servReqData.serviceStatus = vm.selected.value;
    Req.editReq(id, vm.servReqData)
      .success(function(data) {
        console.log(data.message);
      });
    $location.path('/request/view/' + id);
  };


});
