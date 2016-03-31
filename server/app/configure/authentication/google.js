'use strict';

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var mongoose = require('mongoose');
var UserModel = mongoose.model('User');

module.exports = function (app) {

    var googleConfig = app.getValue('env').GOOGLE;

    var googleCredentials = {
        clientID: googleConfig.clientID,
        clientSecret: googleConfig.clientSecret,
        callbackURL: googleConfig.callbackURL
    };

    // var verifyCallback = function (accessToken, refreshToken, profile, done) {
    //     UserModel.findOne({ 'google.id': profile.id }).exec()
    //         .then(function (user) {
    //             if (user) {
    //                 return user;
    //             } else {
    //                 return UserModel.create({
    //                     email: profile._json.email,
    //                     google: {
    //                         id: profile.id
    //                     }
    //                 });
    //             }
    //         }).then(function (userToLogin) {
    //             done(null, userToLogin);
    //         }, function (err) {
    //             console.error('Error creating user from Google authentication', err);
    //             done(err);
    //         });

    // };

        var verifyCallback = function (accessToken, refreshToken, profile, done) {
        UserModel.findOne({ 'email': profile._json.email }).exec()
            .then(function (user) {
                if (user) {
                    console.log('user already existed: ', user)
                    user.set({
                        google: {
                            email: profile._json.email,
                            id: profile.id, 
                            token: accessToken
                        }
                    })
                    return user.save();
                } else {
                    return UserModel.create({
                        email: profile._json.email,
                        google: {
                            email: profile._json.email,
                            id: profile.id, 
                            token: accessToken
                        }
                    });
                }
            }).then(function (userToLogin) {
                done(null, userToLogin);
            }, function (err) {
                console.error('Error creating user from Google authentication', err);
                done(err);
            });

    };

    passport.use(new GoogleStrategy(googleCredentials, verifyCallback));

    app.get('/auth/google', passport.authenticate('google', {
        // scope: ['profile', 'email']
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }));
    
    app.get('/auth/google/callback', passport.authenticate('google', { 
        failureRedirect: '/login',
        successRedirect: '/notes'
    }));

};


