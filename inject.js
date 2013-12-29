/**
 * Инъект-скрипт. Вешает обработчики для плеера и радио.
 * Этот скрипт имеет доступ к JS переменным этого window. Поэтому мы можем пользоваться JS функциями от PDJ.
 *
 * Deliaz, Декабрь 2013
 * http://promodj.com/deliaz
 */

console.log("Скрипт инъектирован.");

// Селектор под включенное радио
var $channel = null;

document.body.addEventListener('playstop_ext', function() {
    // Для плеера миксов
    var CP = window.CORE.CurrentPlayer;
    if(CP) {
        switch(CP.status) {
            case 'play':
                CP.perform("pause");
                console.log("Пауза");
                break;
            case 'pause':
                CP.perform("play");
                console.log("Воспроизведение");
                break;
        }
    }

    // Для радио
    var R = window.Radio;
    if(R) {
        if (R.played) {
            R.Playa.PlayerStop();
            R.Unfire();

            // Снимаем отображение включенного радио
            $channel = $$("span.played");
            $channel.removeClass("played")

            console.log("Радио выкл.");
            R.played = false;
        }
        else {
            R.Playa.PlayerPlay();
            console.log("Радио вкл.");
            $channel.addClass("played")
            R.played = true;
        }
    }
});