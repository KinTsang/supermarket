'use strict';
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const Model = require('../../../db');
const Order = Model.Order;
const PowerOrder = Model.PowerOrder;

module.exports = function (app, db) {

    var User = db.model('user');

    // When passport.authenticate('local') is used, this function will receive
    // the email and password to run the actual authentication logic.
    var strategyFn = function (email, password, done) {
        User.findOne({
                where: {
                    email: email
                }
            })
            .then(function (user) {
                // user.correctPassword is a method from the User schema.
                if (!user || !user.correctPassword(password)) {
                    done(null, false);
                } else {
                    // Properly authenticated.
                    done(null, user);
                }
            })
            .catch(done);
    };

    passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'}, strategyFn));

    // A POST /login route is created to handle login.
    app.post('/login', function (req, res, next) {

        var authCb = function (err, user) {

            if (err) return next(err);

            if (!user) {
                var error = new Error('Invalid login credentials.');
                error.status = 401;
                return next(error);
            }

            // req.logIn will establish our session.
            req.logIn(user, function (loginErr) {
                if (loginErr) return next(loginErr);
                // We respond with a response object that has user with _id and email.

                var userId = user.dataValues.id
                    //if there are items in cart but not in model...then add the info from cart in model.
                    if (req.session.cart){
                        Order.findOrCreate({ //this is the same code as the post route for carts
                            where: {
                                userId: userId,
                                status: 'open'
                            }
                        })
                        .spread((order, created) => {
                            var promiseArr = [];
                            req.session.cart.forEach(function(ele){
                                var savingOrder = PowerOrder.findOrCreate({
                                    where: {
                                        orderId: order.id,
                                        powerId: ele.powerId
                                    }
                                })
                                .spread((powerorder, created) => {
                                    powerorder.quantity += ele.quantity;
                                    return powerorder.save();
                                 });

                                promiseArr.push(savingOrder)
                            })

                            return Promise.all(promiseArr)

                        })
                        .then(() => {
                            req.session.cart = [];
                        })
                        .then(() => res.send({
                            user: user.sanitize()
                        }))
                        .catch((err) => {
                            res.status(400).send(err);
                        });
                    } else {
                        res.status(200).send({
                            user: user.sanitize()
                        });
                    }
                })
        };

        passport.authenticate('local', authCb)(req, res, next);

    });

};
