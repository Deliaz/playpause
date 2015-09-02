/**
 * Content-скрипт.
 * Запускается на каждой странице http://promodj.com/
 *
 * Данный скрипт, в силу особенностей Chrome Extensions не имеет доступа к JS переменным и методам окна с PDJ.
 * Поэтому он будет лишь отлавливать запросы от background и выполнять события, обработчики для которых будут
 * объявлены в inject.js.
 *
 * Deliaz, Декабрь 2013
 * http://promodj.com/deliaz
 */

$(function() {
    // Инъектим скрипт inject.js
    $.get(chrome.extension.getURL('inject.js'),
        function(data) {
            var script = document.createElement("script");
            script.setAttribute("type", "text/javascript");
            script.innerHTML = data;
            document.getElementsByTagName("head")[0].appendChild(script);
        }
    );

    // Обработчик вызовов от background: вызывается по нажатию на кнопку приложения
    chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {

        if (request.action == "playpause") {
            // Триггер на нативном JS
            var myEvent = new CustomEvent(request.eventName);
            document.body.dispatchEvent(myEvent);

            sendResponse({status: "success"});
        }
        else {
            sendResponse({status: "failed"});
        }
    });
});