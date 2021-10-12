const baseUrl = `/weather?address=`;
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (event) => {
	event.preventDefault();

	// Capture input
	const location = search.value;

	// Loading state
	messageOne.textContent = 'Loading...';
	messageTwo.textContent = '';

	// Submit data to API
	fetch(baseUrl + location).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				messageOne.textContent = data.error;
			} else {
				messageOne.textContent = data.location;
				messageTwo.textContent = data.forecast;
			}
		});
	});
});
