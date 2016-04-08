angular.module('reviewService', [])

.factory('Review', function($http) {
  var reviewFactory = {};

  // postReview(reviewData) => post a review
  reviewFactory.postReview = function(reviewData) {
    return $http.post('/api/reviews', reviewData);
  };

  return reviewFactory;
});
