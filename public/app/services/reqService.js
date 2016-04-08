angular.module('reqService', [])

.factory('Req', function($rootScope, $http) {
  var reqFactory = {};

  // getUserReqs(userID) => get all of service reqs matching userID
  reqFactory.getUserReqs = function(userID) {
    return $http.get('/api/requests/user/' + userID);
  };

  // makeReq => create new service request
  reqFactory.makeReq = function(serviceReqData) {
    return $http.post('/api/requests?clientID=' + $rootScope.user.id, serviceReqData);
  };

  // getReq(id) => get info about a single service req
  reqFactory.getReq = function(id) {
    return $http.get('/api/requests/' + id);
  };

  // editReq(id) => edit info about a service req
  reqFactory.editReq = function(id, serviceReqData) {
    return $http.put('api/requests/' + id, serviceReqData);
  };

  // deleteReq(id) => delete a service req

  // countReqBids(id) => count and return all bids for a request
  reqFactory.countReqBids = function(reqID) {
    return $http.get('/api/requests/count/' + reqID);
  };

  // getBids(id) => get all bids on a given request
  reqFactory.getBids = function(reqID, status) {
    return $http.get('/api/bids/' + reqID + '?status=' + status);
  };

  // changeBidStatus(id) => decline bid
  reqFactory.changeBidStatus = function(bidID, bidData) {
    return $http.put('/api/bids/' + bidID, bidData);
  };

  // search(query) => search for requests based on query
  reqFactory.search = function(query) {
    return $http.get('/api/requests?q=' + query);
  };

  return reqFactory;
});
