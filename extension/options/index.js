const originRegex = /https?:\/\/[^/?#]+/;
const cdForm = document.querySelector('#custom-domain');
const cdInput = document.querySelector('#custom-domain-origin');

cdForm.addEventListener('submit', e => {
	e.preventDefault();

	if (!chrome.permissions) {
		alert('Your browser doesn’t yet support the WebExtensions Permission API');
		return;
	}

	const url = cdInput.value;
	const origin = url.match(originRegex);

	if (origin) {
		origin[0] += '/*';
		chrome.permissions.request({
			origins: origin
		}, granted => {
			if (granted) {
				cdForm.reset();
			}
		});
	}

});
