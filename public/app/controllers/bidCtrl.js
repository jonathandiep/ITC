angular.module('bidCtrl', [])

.controller('editBidController', function($routeParams, $location, Bid) {
  var vm = this;

  vm.getBid = function() {
    var id = $routeParams.bid_id;
    Bid.getBid(id)
      .success(function(data) {
        vm.bidData = data[0];
        if (vm.bidData.priceType === 'Fixed') {
          vm.selected = vm.options[0];
        } else if (vm.bidData.priceType === 'Hourly') {
          vm.selected = vm.options[1];
        } else {
          vm.selected = vm.options[2];
        }
        console.log(vm.bidData);
      });

  }

  vm.options = [
    {
      name: 'Fixed',
      value: 'Fixed'
    },
    {
      name: 'Hourly',
      value: 'Hourly'
    },
    {
      name: 'Need more info',
      value: 'Need more info'
    }
  ];

  vm.getBid();

  vm.editBid = function() {
    var id = $routeParams.bid_id;
    vm.bidData.priceType = vm.selected.value;
    Bid.editBid(id, vm.bidData)
      .success(function(data) {
        console.log(data.message);
      });
    $location.path('/dashboard');
  };

});
