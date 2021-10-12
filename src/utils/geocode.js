const request = require('request');
const buildApiUrl = require('./api-url');
const { apiObj, requestOptionsObj } = require('./default-objects');

// Configuration
const geocodeObj = Object.create(apiObj);
geocodeObj.key = 'pk.eyJ1IjoiZG9vZGVseSIsImEiOiJja3VoNmlkNTUwdDJmMnJ0NHJyMnE1Znl1In0.BbZ1o1onxmNFLfnCCjLx7Q';
geocodeObj.baseUrl = 'https://api.mapbox.com/';
geocodeObj.endpoints = {
	geocoding: 'geocoding/v5/mapbox.places/',
};
geocodeObj.params = {
	limit: 1,
};
const geocodeApiConf = Object.create(requestOptionsObj);

const geocode = (address, callback) => {
	geocodeApiConf.url = buildApiUrl(
		`${geocodeObj.baseUrl}${geocodeObj.endpoints.geocoding}`,
		geocodeObj.key,
		false,
		address,
		geocodeObj.params,
	);

	request(geocodeApiConf, (error, { body }) => {
		if (error) {
			callback('Unable to connect to location services!');
		} else if (body.features.length === 0) {
			callback('Unable to find location. Try another search.');
		} else {
			// Data capture
			const data = body.features[0];
			const location = data.place_name;

			// Lat/Long listed as an array with the schema: [<long>, <lat>]
			callback(undefined, {
				location,
				latitude: data.center[1],
				longitude: data.center[0],
			});
		}
	});
};

module.exports = geocode;
