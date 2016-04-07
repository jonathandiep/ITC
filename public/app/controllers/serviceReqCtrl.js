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

.controller('getServReqController', function($routeParams, Req) {
  var vm = this;

  vm.getServReq = function() {
    var id = $routeParams.id;
    Req.getReq(id)
      .success(function(data) {
        //console.log(data);
        vm.servReqData = data;
      });
    Req.getBids(id)
      .success(function(data) {
        console.log(data);
        vm.bidData = data;
      });
  };

  vm.getServReq();

})

.controller('editServReqController', function($routeParams, Req) {
  var vm = this;

  vm.getServReq = function() {
    var id = $routeParams.id;
    Req.getReq(id)
      .success(function(data) {
        console.log(data);
        vm.servReqData = data;
        vm.selected = vm.servReqData.status === 'Open' ? vm.options[0] : vm.options[1];
        console.log(vm.selected);
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
    vm.servReqData.status = vm.selected.value;
    Req.editReq(id, vm.servReqData)
      .success(function(data) {
        console.log(data.message);
      });
  };


});
