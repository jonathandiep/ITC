angular.module('bidService', [])

.factory('Bid', function($http) {
  var bidFactory = {}

  // getBid(bidID) => gets all info about a bid
  bidFactory.getBid = function(bidID) {
    return $http.get('/api/bids/' + bidID);
  };

  // getBids(providerID) => returns all bids given a provider's ID
  bidFactory.getBids = function(providerID) {
    return $http.get('/api/bids?provider=' + providerID);
  };

  // getBidByReqID(reqID) => gets bid info given a request ID
  bidFactory.getBidByReqID = function(reqID) {
    return $http.get('/api/bids?service=' + reqID);
  };

  // postBid = function(serviceID, bid) => posts a bid to a serviceID
  bidFactory.postBid = function(serviceID, bid) {
    return $http.post('/api/bids?service=' + serviceID, bid);
  };

  // editBid(bidID, bid) => edits a bid given its id and the bid object
  bidFactory.editBid = function(bidID, bid) {
    return $http.put('/api/bids/' + bidID, bid);
  };

  // deleteBid(bidID) => deletes a bid given its id
  bidFactory.deleteBid = function(bidID) {
    return $http.delete('/api/bids/' + bidID);
  };

  return bidFactory;
});
