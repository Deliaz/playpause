const patterns = [
	{
		url: /promodj\.com\//,
		inject: true,
		eventName: 'playpause:promodj',
	},
	{
		url: /youtube\.com\//,
		code: 'document.querySelector(".ytp-play-button").click()'
	},
	{
		url: /soundcloud\.com\//,
		code: 'document.querySelector(".playControl").click()'
	}
];

chrome.browserAction.onClicked.addListener(function () {

	chrome.tabs.query({currentWindow: true}, tabs => {
		tabs.forEach(tab => {
			patterns.forEach(pattern => {
				if (pattern.url.test(tab.url)) {
					if (!pattern.inject) {
						chrome.tabs.executeScript(tab.id, {
							code: pattern.code
						});
					} else {
						chrome.tabs.sendRequest(tab.id, {
							action: 'playpause',
							eventName: pattern.eventName
						});
					}
				}
			})
		});
	});

});