'use strict';

app.config(function($stateProvider) {

    $stateProvider.state('productReview', {
        url: '/reviews/:powerId',
        templateUrl: 'js/review/review.html',
        controller: 'ReviewCtrl',
        resolve: {
            reviewInfo: function($http, $stateParams) {
                return $http.get('api/powers/reviews/' + $stateParams.powerId)
                    .then((reviewInfo) => {
                        return reviewInfo.data
                    })
            }
        }
    })

    $stateProvider.state('createReview', {
        url: '/addReviews/:powerId',
        templateUrl: 'js/review/createReview.html',
        controller: 'ReviewCtrl',
        resolve: {
            reviewInfo: function() {
                return null;
            }
        }
    })

})

app.controller('ReviewCtrl', function($scope, reviewInfo, ReviewFactory) {
    $scope.reviewInfo = reviewInfo;

    $scope.newReview = {}
    $scope.reviewSubmitted = false

    $scope.createReview = function(newReview) {
        ReviewFactory.createReview(newReview)
            .then((createdReview) => {
              $scope.newReview = {};
              $scope.reviewSubmitted = true;
              return createdReview
            })
    }

    $scope.rating = 5;

})

app.factory('ReviewFactory', function($http, $stateParams) {
    var object = {};

    object.createReview = function(newReview) {
        return $http.post('/api/powers/addReviews/' + $stateParams.powerId, newReview)
    }

    return object;
})




app.directive('starRating',
    function() {
        return {
            restrict: 'A',
            template: '<ul class="rating">' + '  <li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">' + '\u2605' + '</li>' + '</ul>',
            scope: {
                ratingValue: '=',
                max: '=',
                onRatingSelected: '&'
            },
            link: function(scope, elem, attrs) {
                var updateStars = function() {
                    scope.stars = [];
                    for (var i = 0; i < scope.max; i++) {
                        scope.stars.push({
                            filled: i < scope.ratingValue
                        });
                    }
                };

                scope.toggle = function(index) {
                    scope.ratingValue = index + 1;
                    scope.onRatingSelected({
                        rating: index + 1
                    });
                };

                scope.$watch('ratingValue',
                    function(oldVal, newVal) {
                        if (newVal) {
                            updateStars();
                        }
                    }
                );
            }
        };
    }
);
