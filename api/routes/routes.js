// packages
var bodyParser = require('body-parser'),
    User = require('../models/user'),
    jwt = require('jsonwebtoken'),
    config = require('../../config'),
    secret = config.secret;

module.exports = function(express) {
    var apiRouter = express.Router();

    // route for authenticating users
    apiRouter.post('/authenticate', function(req, res) {
        // find user and select name, username, and password
        User.findOne({username: req.body.username}).select('name username password')
            .exec(function(err, user) {
                if (err) throw err;

                // no user with username found
                if (!user) {
                    res.json({
                        success: false,
                        message: "Authentication failed. User not found"
                    });
                } else if (user) {
                    // check for matching password
                    var validPassword = user.comparePassword(req.body.password);
                    if (!validPassword) {
                        res.json({
                            success: false,
                            message: "Authentication failed. Wrong password"
                        });
                    } else {
                        var id = user._id;
                        var token = jwt.sign({
                            name: user.name,
                            username: user.username
                        }, secret, {
                            expiresInMinutes: 1440 // 24 hours
                        });

                        res.json({
                            success: true,
                            message: "Enjoy your token!",
                            token: token,
                            id: id
                        });
                    }
                }
            });
    });

    apiRouter.route('/users')
        .post(function(req, res) {
            // new instance of User model
            var user = new User();

            // set users information obtained from request
            user.name = req.body.name;
            user.username = req.body.username;
            user.password = req.body.password;
            if (req.body.bestscoreA)
                user.bestscoreA = req.body.bestscoreA;
            if (req.body.bestscoreB)
                user.bestscoreB = req.body.bestscoreB;

            user.save(function(err) {
                if (err) {
                    // if duplicate entry
                    if (err.code === 11000) {
                        return res.json({
                            success: false,
                            message: "A user with that username already exists"
                        });
                    } else {
                        return res.send(err);
                    }
                }

                res.json({message: 'User created!'});
            });
        })
        .get(function(req, res) {
            User.find(function(err, users) {
                if (err) return res.send(err);
                res.json(users);
            });
        });

    // middleware for all requests
    apiRouter.use(function(req, res, next) {

        // check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        // decode token
        if (token) {
            // verify secret and check expiration
            jwt.verify(token, secret, function(err, decoded) {
                if (err) {
                    return res.status(403).send({
                        success: false,
                        message: "Failed to authenticate token"
                    });
                } else {
                    // save request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            })
        } else {
            // if no token
            res.status(403).send({
                success: false,
                message: "No token found"
            });
        }
    });

    // test to show alternate route syntax
    apiRouter.get('/', function(req, res) {
        res.json({message: 'Hooray welcome to our API!'});
    });

    // find specific user
    apiRouter.route('/users/:user_id')
        .get(function(req, res) {
            User.findById(req.params.user_id, function(err, user) {
                if (err) return res.send(err);
                res.json(user);
            });
        })
        .put(function(req, res) {
            User.findById(req.params.user_id, function(err, user) {
                if (err) return res.send(err);

                // only update if value changed
                if (req.body.name) user.name = req.body.name;
                if (req.body.username) user.username = req.body.username;
                if (req.body.password) user.password = req.body.password;
                if (req.body.bestscoreA) user.bestscoreA = req.body.bestscoreA;
                if (req.body.bestscoreB) user.bestscoreB = req.body.bestscoreB;

                user.save(function(err) {
                    if (err) return res.send(err);
                    res.json({message: "User updated!"});
                });
            });
        })
        .delete(function(req, res) {
            User.remove({
                _id: req.params.user_id
            }, function(err, user) {
                if (err) res.send(err);
                res.json({message: 'User successfully deleted'});
            })
        });

    // get information about user for use to display in navbar
    apiRouter.get('/me', function(req, res) {
        // req.decoded created from authenticate route
        res.send(req.decoded);
    });

    return apiRouter;
};