const Connection = require('../models/ConnectionsModel');
const Rsvp = require('../models/Rsvp');
const mongoose = require('mongoose');
const validationResult = require('express-validator').validationResult;



exports.getAllConnections = (req, res, next) => {
    Connection.find().populate('User', 'firstName')

    .then(result => {
            res.render('./connections/connections', { conListHandler: result, title: 'Connections' });
        })
        .catch(err => {
            console.log(err);
            next();
        });
}

exports.getConnectionDetail = (req, res, next) => {
    Connection.findById(req.params.id).populate('User', 'firstName')
        .then(result => {
            if (result) {

                console.log(result, '_____________________________________________________________')
                Rsvp.find({ event: req.params.id, going: 'Yes' })
                    .then(resArray => {

                        console.log(resArray, '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
                        res.render('./connections/connection', { eventhandle: result, title: " Details of " + result.conTitle, len: resArray.length });

                    }).catch(err => {
                        console.log('err')
                        res.render('./connections/connection', { eventhandle: result, title: " Details of " + result.conTitle, len: 35 });

                    })
            } else { next() }


        })
        .catch(err => {
            console.log(err);
            next();
        });

}

exports.getConnectionCreate = (req, res) => {
    res.render('./connections/NewConnections', { title: "New Connections" });
}
exports.createConnection = (req, res, next) => {


    const errors = validationResult(req);
    // console.log(errors.array());
    if (!errors.isEmpty()) {
        errors.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        res.redirect('/')
    } else {


        let connection = new Connection({
            conTopic: req.body.conTopic,
            conTitle: req.body.conTitle,
            conHost: req.body.conHost,
            conDetails: req.body.conDetails,
            conLocation: req.body.conLocation,
            conDate: req.body.conDate,
            conStart: req.body.conStart,
            conEnd: req.body.conEnd,
            conImgURL: req.body.conImgURL,
            user: req.session.user.id
        });
        connection.save()
            .then(result => {
                req.flash('success', 'Successfully created the Event')

                res.redirect('/connections');
            })
            .catch(err => {
                console.log(err);
                next();
            });
    }
}

exports.getConnectionUpdate = (req, res, next) => {
    Connection.findById(req.params.id)
        .then(result => {
            if (result && result.user.equals(req.session.user.id)) {
                // console.log(result, 'text');
                // && result.user.equals(req.session.user.id)
                res.render('./connections/UpdateConnection', { eventhandle: result, title: 'Update Connection!' });
            } else {
                res.redirect('/connections');
            }
        })
        .catch(err => {
            console.log(err);
            next();
        });
}



exports.updateConnection = (req, res, next) => {


    let connectionParams = {
        conTopic: req.body.conTopic,
        conTitle: req.body.conTitle,
        conHost: req.body.conHost,
        conDetails: req.body.conDetails,
        conLocation: req.body.conLocation,
        conDate: req.body.conDate,
        conStart: req.body.conStart,
        conEnd: req.body.conEnd,
        conImgURL: req.body.conImgURL,
    };


    Connection.findById(req.params.id)
        .then(result => {
            if (result && result.user.equals(req.session.user.id))
                return Connection.findByIdAndUpdate(req.params.id, { $set: connectionParams });
            else
                req.flash('error', 'not authorized')

            res.redirect('/connections');
        })
        .then(result => {
            req.flash('success', 'Successfully updated the event')

            res.redirect('/connections/connection/' + req.params.id)
        })

    .catch(err => {
        console.log(err);
        next();
    });

};

exports.deleteConnection = (req, res, next) => {
    Connection.findById(req.params.id)
        .then(result => {
            if (result && result.user.equals(req.session.user.id))
            // && result.user.equals(req.session.user.id)
            {
                Connection.findByIdAndDelete(req.params.id)
                    .then(result => {
                        Rsvp.deleteMany({ connection: req.params.id }).then(result => {
                                req.flash('success', 'successfully deleted'),

                                    res.redirect('/connections');
                            }



                        )

                    })
            }
        })


    .catch(err => {
        console.log(err);
        next();
    });





}


exports.createRsvp = (req, res, next) => {
    console.log(req.params);
    let rsvpParams = {
            event: req.params.id,
            user: req.session.user.id,
            going: req.body.rsvp
        }
        // console.log(rsvpParams);
        // console.log(mongoose.Types.ObjectId.isValid('5fc94d388c834a4f24198ecb'));
    Rsvp.findOneAndUpdate({ event: req.params.id, user: req.session.user.id }, rsvpParams, { upsert: true }).then(result => {

        req.flash('success', 'you have rsvped');
        res.redirect('/connections/SavedConnections')
    }).catch(err => {
        console.log(err);
        next();
    })
}




exports.getSavedConnections = (req, res, next) => {
    let temp
    Connection.find({ user: req.session.user.id }).populate('user')
        .then(result => {
            if (result) {
                temp = result;
                Rsvp.find({ user: req.session.user.id }).populate('event').then(result => {

                    const rsvpData = (result.filter(x => x.user == req.session.user.id));
                    // console.log(rsvpData, 'karim')

                    // var madeConnections = (result.map(x => console.log(x.user)));
                    // console.log(req.session.user.id, 'reza')




                    // console.log(result, 'saved');
                    res.render('./connections/SavedConnections', { data: temp, rsvpData: rsvpData, title: 'Saved Connections' });
                }).catch(err => {
                    res.render('./connections/SavedConnections', { data: temp, title: 'Saved Connections' });

                })

                // var madeConnections = (result.filter(x => x.event.user === req.session.user.id));
                // console.log(madeConnections, 'made connections');
                // res.render('./connections/SavedConnections', { data: result, title: 'Saved Connections' });
            } else {
                res.render('./connections/SavedConnections', { title: 'Saved Connections' })
            }

        })


}

exports.authenticate = (req, res, next) => {
    if (!req.session.user) {
        res.redirect("/users/login");
    } else {
        next();
    }
}