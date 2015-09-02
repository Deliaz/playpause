/**
 * Background скрипт.
 * Отслеживает нажатие на иконку приложения и передает соответствующее сообщение всем content-скриптам.
 * Которые, тем временем, загружаются только на поддерживаемых страницах
 *
 * Deliaz, Декабрь 2013
 * http://promodj.com/deliaz
 * */

var patterns = [
    {url: /promodj.com\//, eventName: 'playstop:promodj'},
    {url: /youtube.com\//, eventName: 'playstop:youtube'},
    {url: /tunein.com\//, eventName: 'playstop:tunein'}
];

$(function () {
    // Обработчик на нажатие кнопки приложения
    chrome.browserAction.onClicked.addListener(function () {

        // Перебираем все вкладки в поисках поддерживамых сайтов
        chrome.tabs.getAllInWindow(function (tabs) {
            for (var i = 0; i < tabs.length; i++) {
                var tab = tabs[i];

                for (var j = 0; j < patterns.length; j++) {
                    // Если это целевая вкладка - отправляем туда сообщение
                    if (patterns[j].url.test(tab.url)) {
                        chrome.tabs.sendRequest(tab.id, {
                            action: "playpause",
                            eventName: patterns[j].eventName
                        }, function (response) {
                            // response callback
                            // TODO change icon
                        });
                    }
                }
            }
        });
    });

});