//1. click checkout
//2. are you signed on or not?
  //a. guest
    //i. options
      //a. sign in
      //b. guest checkout
  //b.signed in user
    //if order has changed from sign in, notify?


//Checkout
  //a. name
  //b. email
  //c. address
  //d. billing. option to say same as shipping
  //credit card payment - stripe
  //review - place my order


// TLEE's updates.
//
//   app.config(function ($stateProvider) {
//     $stateProvider.state('shipping', {
//       url: '/checkout/shipping',
//       templateUrl: 'js/checkout/checkout.shipping.html',
//       resolve: {
//         user: (AuthService) => AuthService.getLoggedInUser(false),
//         items: (CartFactory) => CartFactory.fetchAll()
//       },
//       controller: 'CheckoutCtrl'
//     })
//     .state('review', {
//       url: '/checkout/review',
//       templateUrl: 'js/checkout/checkout.review.html',
//       resolve: {
//         user: (AuthService) => AuthService.getLoggedInUser(false),
//         items: (CartFactory) => CartFactory.fetchAll()
//       },
//       controller: 'CheckoutCtrl'
//     })
//   });

// app.controller('CheckoutCtrl', function ($scope, user, UserFactory, $log, $state, items, CartFactory) {
//   console.log(user);
//   $scope.user = user;
//   $scope.items = items || null;

//   $scope.submitShipping = function (form) {
//     if (user) {
//       UserFactory.editUser(form)
//       .then((updatedUser) => {
//         //$scope.user = updatedUser;
//         $state.go('review');
//       })
//       .catch($log.error);
//     } else {
//       $scope.user = form;
//       $state.go('review');
//     }
//   }

//   CartFactory.getTotal()
//   .then(total => {
//     $scope.total = total;
//   })

//   $scope.completeCheckout = function () {
//     CartFactory.completeCheckout()
//       .then(() => $state.go('home'))
//       .catch($log.error());
  // }
// });

// Stripe.setPublishableKey('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

  // app.controller('CheckoutCtrl', function ($scope, user) {
  //   console.log(user);
  //   $scope.user = user;

  //   $scope.submitPaymentForm = function (form) {
  //     // Disable the submit button to prevent repeated clicks:
  //   //$form.find('.submit').prop('disabled', true); -> MAKE ANGULARLY???

  //   // Request a token from Stripe:
  //   Stripe.card.createToken(form, stripeResponseHandler);

  //   // Stripe.card.createToken({ //first four are the necessary ones
  //   //   number: $('.card-number').val(),
  //   //   cvc: $('.card-cvc').val(),
  //   //   exp_month: $('.card-expiry-month').val(),
  //   //   exp_year: $('.card-expiry-year').val(),
  //   //   address_zip: $('.address_zip').val()
  //   // }, stripeResponseHandler);

  //   // Prevent the form from being submitted:
  //   return false;

  //   }
  // //  function stripeResponseHandler(status, response) {

  // //   // Grab the form:
  // //   var $form = $('#payment-form');

  // //   if (response.error) { // Problem!

  // //     // Show the errors on the form
  // //     $form.find('.payment-errors').text(response.error.message);
  // //     $form.find('button').prop('disabled', false); // Re-enable submission

  // //   } else { // Token was created!

  // //     // Get the token ID:
  // //     var token = response.id;

  // //     // Insert the token into the form so it gets submitted to the server:
  // //     $form.append($('<input type="hidden" name="stripeToken" />').val(token));

  // //     // Submit the form:
  // //     $form.get(0).submit();

  // //   }
  // // }

  // });


