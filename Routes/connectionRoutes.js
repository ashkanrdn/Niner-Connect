const express = require('express');
const router = express.Router();
const validateEvent = require('../middlewares/validator').validateEvent;
const validateRSVP = require('../middlewares/validator').validateRSVP;
const { isLoggedIn, isLoggedOut } = require('../controllers/authController');
const connectionController = require('../controllers/ConnectionController');



// get connections

router.get('/', connectionController.getAllConnections);

//connection details

router.get('/connection/:id', connectionController.getConnectionDetail);

//Saved Connection

router.get('/SavedConnections', isLoggedIn, connectionController.getSavedConnections);

//Get create new connection page

router.get('/NewConnections', isLoggedIn, connectionController.getConnectionCreate);
//Create new connection
router.post('/NewConnections', isLoggedIn, validateEvent, connectionController.createConnection);
// getRestaurantUpdate

router.get('/connection/:id/update', isLoggedIn, connectionController.getConnectionUpdate);

// create rsvp
router.post('/connection/:id/rsvp', isLoggedIn, validateRSVP, connectionController.createRsvp);
<<<<<<< HEAD
=======

// updateRestaurant
>>>>>>> 67d6bb86b10864d6301cf8a2e07ac1437740d162

// update Event
router.put('/connection/:id', isLoggedIn, validateEvent, connectionController.updateConnection);




<<<<<<< HEAD
// delete event
=======
// deleteRestaurant
>>>>>>> 67d6bb86b10864d6301cf8a2e07ac1437740d162
router.delete('/connection/:id', isLoggedIn, connectionController.deleteConnection);




module.exports = router;