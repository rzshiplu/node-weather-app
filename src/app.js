const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geoCode = require('./utils/geoCode');
const weatherReport = require('./utils/weatherReport');

const app = express();

// set port
const port = process.env.PORT || 3010;

// set static Path
const publicPath = path.join(__dirname, '../public');
app.use( express.static(publicPath) );

// set views Path
const viewsPath = path.join(__dirname, '../templates/views');
app.set('view engine', 'hbs');
app.set('views', viewsPath);

// set partials Path
const partialsPath = path.join(__dirname, '../templates/partials');
hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
    res.render('index', {active_home_menu: 'active '});
});

app.get('/about', (req, res) => {
    res.render('about', {active_about_menu: 'active '});
});

app.get('/help', (req, res) => {
    res.render('help', {active_help_menu: 'active '});
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an Address'
        });
    }

    geoCode(req.query.address, (geoCodeError, {place_name = '', longitude = 0, latitude= 0} = {}) => {
        if(geoCodeError){
            return res.send({
                error: geoCodeError
            });
        }
    
        weatherReport(latitude, longitude, (weatherReportError, weatherReportResponse) => {
            if(weatherReportError){
                return res.send({
                    error: weatherReportError
                });
            }

            res.send({
                search_address: req.query.address,
                forecast: weatherReportResponse,
                location: place_name,
                longitude: longitude,
                latitude: latitude
            });
        });
    });
});

app.get('*', (req, res) => {
    res.render('error404');
})

app.listen(port, () => {
    console.log('Server Running on port:' + port);
});