const buildApiUrl = (url, key, isWeather, search = '', { ...args }) => {
	let baseUrlAndEndpoint = `${url}`;

	if (isWeather) {
		baseUrlAndEndpoint = `${baseUrlAndEndpoint}?access_key=${key}`;
	} else {
		let encodeSearch = encodeURIComponent(search);
		baseUrlAndEndpoint = `${baseUrlAndEndpoint}${encodeSearch}.json?access_token=${key}`;
	}

	// Map additional args as Obj { key: value } to convert to qs params
	let qs = Object.keys(args)
		.map((key) => `${key}=${args[key]}`)
		.join('&');

	return `${baseUrlAndEndpoint}&${qs}`;
};

module.exports = buildApiUrl;
