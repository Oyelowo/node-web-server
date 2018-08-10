const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
let app = express();

hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('shoutIt', (text) => text.toUpperCase());

app.set('view engine', 'hbs');

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n', (error) => {
        if (error) {
            console.log('Unable to append to server.log')
        }
    })
    console.log(log)
    next()
});

// app.use((req, res, next) => {     res.render('maintenance.hbs',
// {maintenanceMsg: 'Coming  Soon'}); });

app.use(express.static(__dirname + '/public'));

// app.get('/', (req, res) => { //
//     res.send('<h1>Hello Express!</h1>');
//     res.send({
//         name: 'Oyelowo',
//         likes: ['Coding', 'Traveling']
//     });
// });

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Oyelowo\'s Home Page',
        welcomeMessage: 'Welcome to my code cave'
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {pageTitle: 'About Page'})
});

app.get('/bad', (req, res) => {
    res.send({errorMessage: 'unable to fulfill the request'})
});

app.listen(port, () => console.log(`server is up on port ${port}`));