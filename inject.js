/**
 * Инъект-скрипт. Вешает обработчики для плеера и радио.
 * Этот скрипт имеет доступ к JS переменным этого window. Поэтому мы можем пользоваться JS функциями от данной страницы.
 *
 * Deliaz, Декабрь 2013
 * http://promodj.com/deliaz
 */

console.info("Скрипт для управления воспроизведением инъектирован.");

// Селектор под включенное радио
var $channel = null;

document.body.addEventListener('playstop:promodj', function () {
    // Для плеера миксов
    var CP = window.CORE.CurrentPlayer;
    if (CP) {
        switch (CP.status) {
            case 'play':
                CP.perform("pause");
                break;
            case 'pause':
                CP.perform("play");
                break;
        }
    }

    // Для радио
    var R = window.Radio;
    if (R) {
        if (R.played) {
            R.Playa.PlayerStop();
            R.Unfire();

            // Снимаем отображение включенного радио
            $channel = $$("span.played");
            $channel.removeClass("played");

            R.played = false;
        }
        else {
            R.Playa.PlayerPlay();
            $channel.addClass("played");
            R.played = true;
        }
    }
});


document.body.addEventListener('playstop:youtube', function () {
    // Для Youtube видео
    var YT = document.querySelector('video.html5-main-video');

    if(YT) {
        if(YT.paused) {
            YT.play();
        } else {
            YT.pause();
        }
    }
});


document.body.addEventListener('playstop:tunein', function () {
    var TI = document.getElementById('jp_audio_0');

    if(TI) {
        if(TI.paused) {
            TI.play();
        } else {
            TI.pause();
        }
    }
});