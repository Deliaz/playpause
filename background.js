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
		const audibleCount = tabs.filter(tab => tab.audible).length;

		tabs.forEach(tab => {
			patterns.forEach(pattern => {
				if (pattern.url.test(tab.url)) {
					applyRule(tab, pattern, audibleCount);
				}
			})
		});
	});

});

function applyRule(tab, pattern, audibleCount) {
	if (tab.url.includes('www.youtube.com/') && tab.active && audibleCount && !(tab.audible && audibleCount === 1)) {
		// Skip pausing youtube video in case if we have any players in other tabs
		return;
	}

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