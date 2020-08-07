var User = require('../Models/user');
var express = require('express');
var router = express.Router();

// Api to create the user
router.post('/create', (request, response) => {
    let code = 2912;
    let data = new User({
        name: request.body.name,
        phoneNumber: request.body.phoneNumber,
        password: request.body.password,
        email: request.body.email,
        address:request.body.email,
        otp: code
    })
    
    data.save((err, res) => {
        if (err) {
          if (err.code === 11000) {
            var regex = /index\:\ (?:.*\.)?\$?(?:([_a-z0-9]*)(?:_\d*)|([_a-z0-9]*))\s*dup key/i;
            match = err.message.match(regex);
            indexName = match[1] || match[2];
            // If phone number matched
            if (indexName === "phoneNumber") {
              response.json({
                error: true,
                exist: "phoneNumber",
                message: "Phone Number already exist"
              });
              // If email  matched
            } else if (indexName === "email") {
              response.json({
                error: true,
                exist: "email",
                message: "Email already exist"
              });
            } else {
              response.json({
                error: true,
                message: err.message
              });
            }
          }
        } else if (res) {
          response.json({
            error: false,
            result: res,
            message: "User account created succesfully"
          });
        }
      });

})

// Api for login by phone Number and password
router.post('/login', (request, res) => {
    User.findOne({
        email: request.body.email,
        password: request.body.password
    }).then(function (user) {
        if (!user) {
            res.json({
                error: true,
                message: "Invalid Email or password"
            });
        }
        else {
            if (user.enabled == 1) {
                res.json({
                    error: false,
                    result: user,
                    message: "Logged in-Welcome back"
                });

            }
            else {
                res.json({
                    error: true,
                    message: "User not exist"
                });
            }
        }
    }).catch(err => {
        res.json({
            error: true,
            message: errr.message
        });
    });
});

// Api for forgot password
router.post('/forgotPassword', (request, res) => {
    let code = 2912;
    User.findOne({
        email: request.body.email
    }).then(function (user) {
        if (!user) {
            res.json({
                error: true,
                message: "No such email registered!"
            });
        }
        else {
            if (user.enabled == 1) {
                user.otp = code;
                user.save((err, result) => {
                    if (err) {
                        res.json({
                            error: true,
                            message: err.message
                        });
                    }
                    else {
                        res.json({
                            error: false,
                            message: "Otp send to your Number"
                        });
                    }
                })
            }
            else {
                res.json({
                    error: true,
                    message: "User not exist"
                });
            }
        }
    }).catch(err => {
        res.json({
            error: true,
            message: errr.message
        });
    });
});


// Api to  verify the otp
router.post('/verifyOtp', (request, res) => {
    User.findOne({
        email: request.body.email,
        otp: request.body.otp
    }).then(function (user) {
        if (!user) {
            res.json({
                error: true,
                message: "Invalid otp"
            });
        }
        else {
            res.json({
                error: false,
                message: "Otp Verified successfully"
            });
        }
    }).catch(err => {
        res.json({
            error: true,
            message: errr.message
        });
    });
});

// Api for reset the password
router.post('/resetPassword', (request, res) => {

    let password = request.body.password;

    User.findOne({
        email: request.body.email
    }).then(function (user) {
        if (!user) {
            res.json({
                error: true,
                message: "No such email registered!"
            });
        }
        else {
            user.password = password;
            user.save((err, result) => {
                if (err) {
                    res.json({
                        error: true,
                        message: err.message
                    });
                }
                else {
                    res.json({
                        error: false,
                        message: "Password reset Successfully"
                    });
                }
            })
        }
    }).catch(err => {
        res.json({
            error: true,
            message: errr.message
        });
    });
});


// Api to update the profile
router.put('/update', (request, res) => {
    User.findOneAndUpdate({ _id: request.query.id }, { $set: request.body }, { new: true }).then(function (user) {
        if (!user) {
            res.json({
                error: true,
                message: "No such user registered!"
            });
        }
        else {
            res.json({
                error: false,
                result: user,
                message: "Profile updated Successfully"
            });
        }
    }).catch(err => {
        res.json({
            error: true,
            message: errr.message
        });
    });
});

module.exports = router;