angular.module('bidService', [])

.factory('Bid', function($http) {
  var bidFactory = {}

  // getBids(id) => returns all bids given a provider's ID
  bidFactory.getBids = function(providerID) {
    return $http.get('/api/bids?provider=' + providerID);
  };

  return bidFactory;
});
