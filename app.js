//express app
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash')

const connectionRoutes = require('./Routes/connectionRoutes');
const userRoutes = require('./Routes/userRoutes');

const { isLoggedIn, isLoggedOut } = require('./controllers/authController');




const Connection = require('./models/ConnectionsModel');
const User = require('./models/User');

const app = express();
app.use('/public', express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));



const connectionController = require('./Controllers/ConnectionController');
const userController = require('./Controllers/UserController.js');

// listen for requests

mongoose.connect('mongodb://localhost:27017/eventDB', { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true })
    .then((result) => app.listen(8000))
    .catch((err) => console.log(error));

app.use(session({
    secret: 'NBDA',
    resave: false,
    saveUninitialized: false,
}));

app.use(flash());

app.use(methodOverride('_method'));



app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    res.locals.errorMessages = req.flash('error');
    res.locals.successMessages = req.flash('success');
    next();
});


app.get('/', (req, res) => {
    console.log(res.locals.errorMessages, 'err');
    console.log(res.locals.successMessages, 'success');

    res.render('index', { title: "Home" });


});

app.get('/index', (req, res) => {

    res.redirect('/');


});

app.get('/contact', (req, res) => {

    res.render('contact', { title: "Contact" });


});

app.get('/about', (req, res) => {

    res.render('about', { title: "About us" });


});

// _____________________________ CONNECTION ROUTES _____________________________



app.use('/connections', connectionRoutes);



// _____________________________ USER ROUTES _____________________________
app.use('/users', userRoutes);



// Saved connections



app.use((req, res) => {
    res.render('error', { title: "404 error" });

})