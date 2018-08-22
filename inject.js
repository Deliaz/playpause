let lastPlayedPdjChannel = null;
document.body.addEventListener('playpause:promodj', function () {
    // Для плеера миксов
    const CP = window.CORE.CurrentPlayer;
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

    const R = window.Radio;
    if (R) {
        if (R.played) {
            R.Playa.PlayerStop();
            R.Unfire();

            lastPlayedPdjChannel = $$("span.played"); // pdj has assigned jquery name to "$$"
            lastPlayedPdjChannel.removeClass("played");

            R.played = false;
        }
        else {
            R.Playa.PlayerPlay();
            lastPlayedPdjChannel.addClass("played");
            R.played = true;
        }
    }
});