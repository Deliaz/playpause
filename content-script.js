(() => {
	fetch(chrome.extension.getURL('inject.js'))
		.then(response => response.text())
		.then(data => {
			const scriptEl = document.createElement('script');
			scriptEl.setAttribute('type', 'text/javascript');
			scriptEl.innerHTML = data;
			document.getElementsByTagName('head')[0].appendChild(scriptEl);
		})
		.catch(e => {
			console.error(e);
		});

	chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
		if (request.action === 'playpause') {
			const myEvent = new CustomEvent(request.eventName);
			document.body.dispatchEvent(myEvent);
			sendResponse({status: 'success'});
		}
		else {
			sendResponse({status: 'failed'});
		}
	});
})();