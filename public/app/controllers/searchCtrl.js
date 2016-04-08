angular.module('searchCtrl', [])

.controller('searchController', function($location, $routeParams, $window, Req) {
  var vm = this;

  vm.search = function(query) {
    if (query) {
      $location.path('/request/search/' + query);
    } else {
      $window.alert('Cannot submit an empty search!');
    }
  }

  vm.display = function() {
    var query = $routeParams.query;
    vm.query = query;
    Req.search(query)
      .then(function(data) {
        console.log(data.data);
        var results = data.data;
        vm.searchData = results;
        var a = new Array();
        for(let i = 0; i < results.length; i++) {
          a[i] = null;
          Req.countReqBids(results[i].idServiceRequest)
            .then(function(data) {
              a[i] = data.data.count;
            });
        }
        vm.offers = a;
      })
  }

  vm.display();

  vm.back = function() {
    $window.history.back();
  }

})

.controller('searchBidController', function($routeParams, $location, $window, Bid,  Req) {
  var vm = this;

  vm.display = function() {
    var id = $routeParams.request_id;
    Req.getReq(id)
      .then(function(data) {
        vm.service = data.data;
        console.log(vm.service);
      })
    vm.selected = vm.options[0];
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

  vm.display();

  vm.postBid = function(servReqID, providerID) {
    vm.formData.priceType = vm.selected.value;
    vm.formData.provider = providerID;
    console.log(providerID);
    Bid.postBid(servReqID, vm.formData)
      .then(function(data) {
        console.log(data.data);
        $location.path('/dashboard');
      });
  };

  vm.back = function() {
    $window.history.back();
  }

})

.controller('browseController', function($location, $window, Req) {
  var vm = this;

  vm.search = function(query) {
    if (query) {
      $location.path('/request/search/' + query);
    } else {
      $window.alert('Cannot submit an empty search!');
    }
  }

  Req.browse()
    .then(function(data) {
      var results = data.data;
      console.log(data.data);
      vm.browseData = results;
      var a = new Array();
      for(let i = 0; i < results.length; i++) {
        a[i] = null;
        Req.countReqBids(results[i].idServiceRequest)
          .then(function(data) {
            a[i] = data.data.count;
          });
      }
      vm.offers = a;

    });

    vm.back = function() {
      $window.history.back();
    }
});
