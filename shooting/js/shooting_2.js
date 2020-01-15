function startAnimation(rangeSpeed = [45, 60]) {
    function randomInteger(min, max) {
        var rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    }

    $('.ufo').each(function () {
        var countSeconds = String(randomInteger(rangeSpeed[0], rangeSpeed[1])),
            trajectoryUfo = String(randomInteger(1, 5));

        $(this).css({
            animation: 'ufo-fly-' + trajectoryUfo + ' ' + countSeconds + 's infinite alternate linear'
        })
    });
    console.log('Animatin strt');
}


function levelUp(levelNow){
    var rangeSpeed = [20, 40];

    for(var i = 0; i < 2; i++){
        rangeSpeed[i] = rangeSpeed[i] / levelNow;
    }
    console.log('Animatin upped');

    return rangeSpeed
}

function startGame(rangeSpeeds, level){
    $('.game-shield-txt').text('Level ' + level);
    audioStartGame.play();
    setTimeout(function () {
        $('.game-shield').addClass('display-none');
    }, 1500);

    setTimeout(function () {
        console.log('Game strt');
        startAnimation(rangeSpeeds);
        var lastingGame = 0;
        timerId = setInterval(function () {
            lastingGame++;
            var fullStr = String(lastingGame) + ' сек';
            $('.game-data-time').text(fullStr);
        }, 1000); //to do return timerId
    }, 1500);
}

var audioShot = new Audio(), audioStartGame = new Audio();
audioShot.src = "/home/stalin/Partfolio/shooting/audio/16557_1460656892.mp3";
audioStartGame.src = '/home/stalin/Partfolio/shooting/audio/start_game.mp3';

var currentLevel = 1, counter = 0, timerId = 0,
    $ufoList = $('.ufo'),
    $ufoListCount = $ufoList.length;

$('.form-btn').click(function () {
    if ($('.form-username').val()) {
        $('.form').addClass('display-none');
            timerId = startGame(levelUp(currentLevel), currentLevel);
    }
});

$ufoList.click(function () {
    audioShot.play();
    $(this).toggleClass('ufo-shotdown');
    if($('.ufo-shotdown').length == $ufoListCount){
        currentLevel++;
        clearInterval(timerId);
        $ufoList.css({
            animation: 'none'
        });
        $('.game-shield').removeClass('display-none');
        timerId = startGame(levelUp(currentLevel), currentLevel);
        $ufoList.removeClass('ufo-shotdown');
    }
});
