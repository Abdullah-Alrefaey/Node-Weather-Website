const path = require('path');

// Creates an Express application.
const express = require('express');
const hbs = require('hbs');
const app = express();
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast')

// Define paths for express configuration && define new path for views
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

// allow to set a value to a given express set // view engin ... set another setting for express , (Custome directory)
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialPath)

// Setup static directory to serve, a way to customize the server .... First try to find the root URL
app.use(express.static(publicDirectoryPath));

// root route using hbs to render dynamic content (using hbs view engine)
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Refaey Meow'
    })
})

// about route
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Refaey Meow'
    });
})

// help route
app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is a help message',
        title: 'Help',
        name: 'Refaey'
    });
})

// Create weather route
app.get('/weather', (req, res) => {
    if (!req.query.address)
    {
        return res.send({
            error: 'You must provide an address term'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error)
        {
            return res.send({
                error: 'Unable to find location. Try another search'
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error)
            {
                return res.send({
                    error: 'Unable to get weather'
                })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
});

app.get('/products', (req, res) => {
    if (!req.query.search)
    {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: '404',
        name: 'Refaey',
        errorMessage: 'Help article not found.'
    })
})

// handle error pages
app.get('*', (req, res) => {
    res.render('404page', {
        title: '404',
        name: 'Refaey',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});