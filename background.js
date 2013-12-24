/**
 * Background скрипт.
 * Отслеживает нажатие на иконку приложения и передает соответствующее сообщение всем content-скриптам.
 * Которые, тем временем, загружаются только на страницах promodj.com
 *
 * Deliaz, Декабрь 2013
 * http://promodj.com/deliaz
 * */
$(function () {
    var pattern = /promodj.com/;

    // Обработчик на нажатие кнопки приложения
    chrome.browserAction.onClicked.addListener(function () {
        // Перебираем все вкладки в поисках promodj.com
        chrome.tabs.getAllInWindow(function (tabs) {
            for (var i = 0; i < tabs.length; i++) {
                var tab = tabs[i];
                // Если это вкладка любимого PDJ - отправляем туда сообщение
                if (tab.url.match(pattern)) {
                    chrome.tabs.sendRequest(tab.id, {action: "playpause"}, function (response) {
                    });
                }
            }
        });
    });

});