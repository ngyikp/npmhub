const originRegex = /https?:\/\/[^/?#]+/;
const gheForm = document.querySelector('#gh-enterprise');
const gheInput = document.querySelector('#gh-enterprise-domain');

gheForm.addEventListener('submit', e => {
	e.preventDefault();

	if (!chrome.permissions) {
		alert('Your browser doesn’t yet support the WebExtensions Permission API');
		return;
	}

	const url = gheInput.value;
	const origin = url.match(originRegex);

	if (origin) {
		origin[0] += '/*';
		chrome.permissions.request({
			origins: origin
		}, granted => {
			if (granted) {
				gheForm.reset();
			}
		});
	}

});
