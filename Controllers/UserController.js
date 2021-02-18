const User = require('../models/User');


const flash = require('connect-flash')
const check = require('express-validator').check;
const validationResult = require('express-validator').validationResult;





exports.getUserCreate = (req, res, next) => {
    res.render('./users/signup', { title: 'SignUP' });
}



exports.postUserCreate = (req, res, next) => {

    const errors = validationResult(req);
    console.log(req.body)
    console.log(errors.array());
    if (!errors.isEmpty()) {
        errors.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        res.redirect('/users/signup')
    } else {


        let user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        });
        user.save()
            .then(result => {
                req.flash('success', 'Successfully signedup')

                res.redirect('/');
            })
            .catch(err => {
                console.log(err);
                next();
            });
    }
}

exports.getUserLogin = (req, res, next) => {
    res.render('./users/login', { title: 'Login' });
}

exports.postUserLogin = (req, res, next) => {
    console.log(req.body)
    const errors = validationResult(req);
    console.log(errors.array());
    if (!errors.isEmpty()) {
        errors.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        res.redirect('/users/login')
    } else {
        let email = req.body.email;
        let password = req.body.password;
        User.findOne({ email: email })
            .then(user => {
                if (user) {
                    user.comparePassword(password)
                        .then(isMatch => {
                            if (isMatch) {
                                req.session.user = { id: user._id, name: user.firstName };
                                req.flash('success', 'Successfully logged in')

                                res.redirect('/connections');
                            } else {
                                //Incorrect password

                                req.flash('error', 'Incorrect password!')
                                console.log('Incorrect password!');

                                res.redirect('/users/login');
                            }

                        })
                } else {
                    //Incorrect email address

                    req.flash('error', 'Incorrect email address!')

                    console.log('Incorrect email address!');

                    res.redirect('/users/login');
                }
            })
            .catch(err => {
                console.log(err);
                next();
            });
    }

};






exports.getUserLogout = (req, res, next) => {
    req.session.destroy(err => {
        res.redirect('/');
    });
}