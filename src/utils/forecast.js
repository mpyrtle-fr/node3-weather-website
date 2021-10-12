const request = require('request');
const buildApiUrl = require('./api-url');
const { apiObj, requestOptionsObj } = require('./default-objects');

// Forecast
const forecastObj = Object.create(apiObj);
forecastObj.key = 'f6365fdcd92f5a190083514744529a93';
forecastObj.baseUrl = 'http://api.weatherstack.com/';
forecastObj.endpoints = {
	current: 'current',
};
forecastObj.params = {
	query: '',
	units: 'f',
};
const forecastApiConf = Object.create(requestOptionsObj);

const forecast = (lat, long, callback) => {
	forecastObj.params.query = `${lat},${long}`;
	forecastApiConf.url = buildApiUrl(
		`${forecastObj.baseUrl}${forecastObj.endpoints.current}`,
		forecastObj.key,
		true,
		'',
		forecastObj.params,
	);

	request(forecastApiConf, (error, { body }) => {
		if (error) {
			callback('Unable to connect to weather services!');
		} else if (body.error) {
			callback('Unable to find forecast information for provided location!');
		} else {
			// Data capture
			const data = body.current;
			const description = data.weather_descriptions[0];
			const precip = data.precip;
			const temp = data.temperature;
			const humidity = data.humidity;
			const wind = {
				speed: data.wind_speed,
				direction: data.wind_dir,
			};

			const fc = `
				${description}. 
				The humidity is ${humidity}% and the current temperature is ${temp}°F. 
				There is a ${precip}% chance of rain. 
				${wind.speed === 0 ? '' : `Wind speed is ${wind.speed} mph coming from the ${wind.direction} direction.`}
			`;

			// Return data mapping
			callback(undefined, {
				fc,
			});
		}
	});
};

module.exports = forecast;
