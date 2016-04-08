angular.module('reviewService', [])

.factory('Review', function($http) {
  var reviewFactory = {};

  // postReview(reviewData) => post a review
  reviewFactory.postReview = function(reviewData) {
    return $http.post('/api/reviews', reviewData);
  };

  // getReviewStatistics(revieweeID) => get reviewee statistics
  reviewFactory.getReviewStatistics = function(revieweeID) {
    return $http.get('/api/reviews/stats/' + revieweeID);
  };

  return reviewFactory;
});
