'use strict';

var passport = require('passport');
// var GithubStrategy = require('passport-github2').OAuth2Strategy; // ?
var GithubStrategy = require('passport-github2').Strategy; // ?
var mongoose = require('mongoose');
var UserModel = mongoose.model('User');
var Promise = require('bluebird');
var _ = require('lodash')


function createUserWithGithubEmail(profile, accessToken){
    return Promise.resolve(UserModel.create({
        github: {
            id: profile.id, 
            token: accessToken
        }
    })).bind({})
    .then(function(user){
        this.user = user; 
        return user.getGithubClient()
    })
    .then(function(client){
        return client.user.getEmailsAsync({per_page: 100})
    })
    .then(function(emails){
        var emailObject = _.find(emails, function(e){
            return e.primary === true; 
        })
        this.user.set('email', emailObject.email)
        return this.user.save()
    })
}

module.exports = function (app) {

    var githubConfig = app.getValue('env').GITHUB;

    var githubCredentials = {
        clientID: githubConfig.clientID,
        clientSecret: githubConfig.clientSecret,
        callbackURL: githubConfig.callbackURL
    };

    var verifyCallback = function (accessToken, refreshToken, profile, done) {
        UserModel.findOne({ 'github.id': profile.id }).exec()
            .then(function (user) {
                if (user) {
                    return user;
                } else {
                 return createUserWithGithubEmail(profile, accessToken)
                }
            })
            .then(function (userToLogin) {
                done(null, userToLogin);
            }, function (err) {
                console.error('Error creating user from Github authentication', err);
                done(err);
            });

    };

    passport.use(new GithubStrategy(githubCredentials, verifyCallback));

    app.get('/auth/github', passport.authenticate('github', { scope: ['user:email', 'user', 'gist'] }));

    app.get('/auth/github/callback',
        passport.authenticate('github', { failureRedirect: '/login' }),
        function (req, res) {
            res.redirect('/notes');
        });

};
