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

  // editReq(id) => edit info about a service req

  // deleteReq(id) => delete a service req

  // countReqBids(id) => count and return all bids for a request
  reqFactory.countReqBids = function(reqID) {
    return $http.get('/api/requests/count/' + reqID);
  };

  return reqFactory;
});
