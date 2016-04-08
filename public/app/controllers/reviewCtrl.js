angular.module('reviewCtrl', [])

.controller('postReviewController', function($rootScope, $routeParams, $location, Req, Bid, Review) {
  var vm = this;

  vm.display = function() {
    Req.getReq($routeParams.req_id)
      .then(function(data) {
        vm.request = data.data;
        console.log(vm.request);
        vm.service = vm.request.serviceTitle;
        if ($routeParams.reviewAs === 'client') {
          vm.selected1 = vm.options1[0];
          Bid.getBidByReqID(vm.request.idServiceRequest)
            .then(function(data) {
              console.log(data.data);
              vm.firstName = data.data.firstName;
              vm.lastName = data.data.lastName;
              vm.providerID = data.data.providerID;
            })
        } else if ($routeParams.reviewAs === 'provider'){
          vm.selected1 = vm.options1[1];
          vm.firstName = vm.request.firstName;
          vm.lastName = vm.request.lastName;
        }
      });


    vm.selected2 = vm.options2[0];
  };

  vm.options1 = [
    {
      name: 'Client',
      value: 'Client'
    },
    {
      name: 'Service Provider',
      value: 'Provider'
    }
  ];

  vm.options2 = [
    {
      name: '5',
      value: 5
    },
    {
      name: '4',
      value: 4
    },
    {
      name: '3',
      value: 3
    },
    {
      name: '2',
      value: 2
    },
    {
      name: '1',
      value: 1
    }
  ];

  vm.display();

  vm.submit = function() {
    console.log($rootScope.user.id);
    vm.formData = {
      reqID: vm.request.idServiceRequest,
      reviewAs: vm.selected1.value,
      reviewer: $rootScope.user.id,
      rating: vm.selected2.value,
      heading: vm.heading,
      message: vm.comments
    };

    if (vm.selected1.value === 'Client') {
      vm.formData['reviewee'] = vm.providerID;
    } else {
      vm.formData['reviewee'] = vm.request.clientID;
    }
    console.log(vm.formData);
    Review.postReview(vm.formData)
      .success(function(data) {
        console.log(data);
        $location.path('/dashboard');
      })
  }

});
