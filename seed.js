/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var chalk = require('chalk');
var db = require('./server/db').db;
var Category = db.model('category');
var Order = db.model('order');
var Power = db.model('power');
var PowerCategory = db.model('power_category');
var PowerOrder = db.model('power_order');
var Review = db.model('review');
var User = db.model('user');
var Promise = require('sequelize').Promise;

var seedUsers = function () {

    var users = [
        {
            email: 'testing@fsa.com',
            password: 'password'
        },
        {
            email: 'obama@gmail.com',
            password: 'potus'
        }
    ];

    var creatingUsers = users.map(function (userObj) {
        return User.create(userObj);
    });

    return Promise.all(creatingUsers);

};

var seedPowers = function () {
    var powers = [
        {
            name: 'Super Speed',
            description: 'Go fast.',
            price: 499.99,
            picUrl: 'http://cdn.okcimg.com/php/load_okc_image.php/images/0x0/0x0/0/8903743280997465155.jpeg___1_500_1_500_cb94de6a_.png'
        },
        {
            name: 'Sweaty Hands',
            description: 'Feel the moisture.',
            price: 1.99,
            picUrl: 'http://www.healthxchange.com.sg/healthyliving/SkinBeauty/PublishingImages/Sweaty-Palms-Pic-1.jpg'
        },
        {
            name: 'Telepathy',
            description: 'Read minds.',
            price: 999.99,
            picUrl: 'http://www.crystalinks.com/telepathy500a.jpg'
        },
        {
            name: 'Invisibility',
            description: 'Disappear',
            price: 799.99,
            picUrl: 'http://images.huffingtonpost.com/2014-10-08-metamaterialsbreakthroughwidespectrumopticalinvisibilitycloak4.jpg'
        },
        {
            name: 'Superhuman Strength',
            description: 'Destroy things.',
            price: 399.99,
            picUrl: 'http://4.bp.blogspot.com/-mV0ryVXz66w/UA2n0occotI/AAAAAAAABEA/EnCQipDXJr8/s1600/hancock_lifting_car_tracks.jpeg'
        },
        {
            name: 'Time Travel',
            description: 'Go back or forward',
            price: 1299.99,
            picUrl: 'http://ichef-1.bbci.co.uk/news/1024/media/images/80912000/jpg/_80912281_153781677.jpg'
        },
        {
            name: 'Night Vision',
            description: 'See in the dark',
            price: 199.99,
            picUrl: 'http://cdn.lightgalleries.net/4ebd8bde12cf2/images/Iraq_Perspective_BookEdit_0049-2.jpg'
        },
        {
            name: 'Omnilinguilism',
            description: 'Understand any language',
            price: 2299.99,
            picUrl: 'http://www.flippedclassroomworkshop.com/wp-content/uploads/2015/07/hello-foreign-languages.png'
        },
        {
            name: 'Fly',
            description: 'You believe you can fly? Can you touch the sky?',
            price: 799.99,
            picUrl: 'http://cdn1.theodysseyonline.com/files/2016/02/21/635916300066231601-352364023_Man-flying-1.jpeg'
        }
    ];
    var creatingPowers = powers.map(function(powerObj) {
        return Power.create(powerObj);
    });
    return Promise.all(creatingPowers);
};

var seedCategories = function () {
    var categories = [
        {
            name: 'Physical'
        },
        {
            name: 'Mental'
        }
    ];
    var creatingCategories = categories.map(function(cateObj) {
        return Category.create(cateObj);
    });
    return Promise.all(creatingCategories);
};

var seedPowerCategories = function () {
    var powercategories = [
        {
            powerId: 1,
            categoryId: 1
        },
        {
            powerId: 2,
            categoryId: 1
        },
        {
            powerId: 3,
            categoryId: 2
        },
        {
            powerId: 4,
            categoryId: 1
        },
        {
            powerId: 5,
            categoryId: 1
        },
        {
            powerId: 6,
            categoryId: 2
        },
        {
            powerId: 7,
            categoryId: 1
        },
        {
            powerId: 8,
            categoryId: 2
        },
        {
            powerId: 9,
            categoryId: 1
        },
    ];
    var creatingPowerCategories = powercategories.map(function(pcObj) {
        return PowerCategory.create(pcObj);
    });
    return Promise.all(creatingPowerCategories);
};

var seedReviews = function () {
    var reviews = [
        {
            description: 'Amazing power. 10/10.',
            rating: 5,
            powerId: 1,
            userId: 1
        },
        {
            description: 'This power is useful, but I get chaffed nipples while running now :(',
            rating: 3,
            powerId: 1,
            userId: 2
        }
    ];
    var creatingReviews = reviews.map(function(rObj) {
        return Review.create(rObj);
    });
    return Promise.all(creatingReviews);
};

db.sync({ force: true })
    .then(function () {
        return seedUsers();
    })
    .then(function () {
        return seedPowers();
    })
    .then(function () {
        return seedCategories();
    })
    .then(function () {
        return seedPowerCategories();
    })
    .then(function () {
        return seedReviews();
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.exit(0);
    })
    .catch(function (err) {
        console.error(err);
        process.exit(1);
    });
