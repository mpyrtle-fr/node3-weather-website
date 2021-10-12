const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather',
		mainHeaderLabel: 'Weather',
		name: 'Mitchell Pyrtle',
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About',
		mainHeaderLabel: 'About Me',
		name: 'Mitchell Pyrtle',
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help',
		mainHeaderLabel: 'Help',
		name: 'Mitchell Pyrtle',
		message: 'This is a message passed to the view!',
	});
});

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'You must provide an address to search by.',
		});
	}

	const address = req.query.address;

	geocode(address, (error, { latitude, longitude, location } = {}) => {
		if (error) {
			return res.send({
				error,
			});
		}

		if (location) {
			forecast(latitude, longitude, (error, { fc } = {}) => {
				if (error) {
					return res.send({
						error,
					});
				}

				return res.send({
					forecast: fc,
					location,
					address,
				});
			});
		}
	});
});

// 404
app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404 | Help',
		mainHeaderLabel: '404 | Help Article Not Found',
		name: 'Mitchell Pyrtle',
		errorMsg: 'Help article not found',
	});
});

app.get('*', (req, res) => {
	res.render('404', {
		title: '404 | App',
		mainHeaderLabel: '404 | Page Not Found',
		name: 'Mitchell Pyrtle',
		errorMsg: 'Page not found',
	});
});

app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});
