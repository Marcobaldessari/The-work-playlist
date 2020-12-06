var track,
    trackDelay,
    playing,
    volumeNumber,
    trackNumber,
    volumeSize = 5,
    album,
    vynil,
    cover

var crackle = new Howl({
    src: ['tracks/crackle.mp3'],
    autoplay: false,
    loop: false,
    volume: .5,
});

// var scratch = new Howl({
//     src: ['tracks/scratch1.mp3'],
//     autoplay: false,
//     loop: false,
//     volume: .4,
// });

// var scratches = new Howl({
//     src: ['tracks/50scratches.mp3'],
//     autoplay: false,
//     sprite: {
//         jump1: [10120, 11300],
//         jump2: [20800, 22600]
//     }
// });


var Albums = document.getElementsByClassName("album");

var Covers = document.getElementsByClassName("cover");
for (var i = 0; i < Covers.length; i++) {
    Covers.item(i).addEventListener("click", playPause);
}

var Vinyls = document.getElementsByClassName("vinyl");
for (var i = 0; i < Vinyls.length; i++) {
    Vinyls.item(i).addEventListener("click", next);
}

// 

function playPause() {
    album = this.parentNode
    for (var i = 0; i < album.childNodes.length; i++) {
        if (album.childNodes[i].className == "vinyl") {
            vinyl = album.childNodes[i]
            break;
        }
    }

    album.classList.toggle("play")
    if (!playing) {
        playMusic(album)

    } else if (playing) {
        if (volumeNumber == album.getAttribute('volume')) {  // if user is interacting with the same album
            stopMusic()

        } else {                // if user is playing another album
            stopMusic()
            Albums.item(volumeNumber - 1).classList.toggle("play")
            playMusic(album)
        }
    }
}

function next() {
    var animation = new TimelineLite()
    animation.to(this, .1, { x:-100, ease: Power1.easeOut })
        .to(this, .4, { x: 0, ease:Back.easeOut.config(1.7) })

    clearTimeout(trackDelay)
    track.stop()
    trackNumber = trackNumber + 1
    if (trackNumber > volumeSize) { trackNumber = 1 }
    track = new Howl({
        src: ['tracks/volume' + volumeNumber + '/' + trackNumber + '.mp3'],
        autoplay: false,
        loop: false,
        volume: .6,
        onend: function () {
            console.log('Finished! Next song loading..')
            next()
        }
    });
    playRandomCrackle()
    track.play()


    var animation = new TimelineLite()
    animation.to(this, .1, { x:-100, ease: Power1.easeOut })
        .to(this, .4, { x: 0, ease:Back.easeOut.config(1.7) })

    // new TimelineLite()

    // .set(this, {
    //     left:"50%"
    // }, 0)
    // // animate position
    // .to(this, 1, {
    //     left:"10%",
    // }, 0.4)
    // .to(this, 1, {
    //     left:"50%",
    // }, 0.4)

    // gsap.to(this, {left:"40%", duration: .2}).to(this, {left:"50%", duration: .2})
    // this.classList.toggle("skipping")

}

function stopMusic() {
    clearTimeout(trackDelay)
    crackle.stop()
    track.stop()
    playing = false
}

function playMusic(album) {
    playing = true
    crackle.volume(1)
    playRandomCrackle()
    volumeNumber = album.getAttribute('volume')
    // console.log("volumeNumber: " + volumeNumber)
    trackNumber = getRandomInt(volumeSize)
    track = new Howl({
        src: ['tracks/volume' + volumeNumber + '/' + trackNumber + '.mp3'],
        autoplay: false,
        loop: false,
        volume: .6,
        onend: function () {
            console.log('Finished! Next song loading..')
            next()
        }
    });
    trackDelay = setTimeout(function () {   // start the track 3s after crackle sound
        track.play()
    }, 3000)
}

function playRandomCrackle(){
    crackle.play()
}

function getRandomInt(max) {                // random int between 1 and max included
    return Math.floor(Math.random() * Math.floor(max) + 1)
}

allCTA = document.getElementsByClassName("CTAspotify")
for (var i = 0; i < allCTA.length; i++) {
    allCTA.item(i).addEventListener("click", function () {
        
        track.stop()
        // Howler.stop()
        album.classList.toggle("play")
    })
}

const scroll = new LocomotiveScroll({       // Enable locomotive scroll
    el: document.querySelector('[data-scroll]'),
    smooth: true,
    direction: "horizontal"
});








// var logo = document.getElementById("logo");
// function onKeyboardOnOff(isOpen) {
//     if (isOpen) {
//         var logo = document.getElementById("logo");
//     } else {
//         // keyboard is closed
//     }
// }

// var originalPotion = false;
// $(document).ready(function(){
//     if (originalPotion === false) originalPotion = $(window).width() + $(window).height();
// });

// /**
//  * Determine the mobile operating system.
//  * This function returns one of 'iOS', 'Android', 'Windows Phone', or 'unknown'.
//  *
//  * @returns {String}
//  */
// function getMobileOperatingSystem() {
//     var userAgent = navigator.userAgent || navigator.vendor || window.opera;

//       // Windows Phone must come first because its UA also contains "Android"
//     if (/windows phone/i.test(userAgent)) {
//         return "winphone";
//     }

//     if (/android/i.test(userAgent)) {
//         return "android";
//     }

//     // iOS detection from: http://stackoverflow.com/a/9039885/177710
//     if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
//         return "ios";
//     }

//     return "";
// }

// function applyAfterResize() {

//     if (getMobileOperatingSystem() != 'ios') {
//         if (originalPotion !== false) {
//             var wasWithKeyboard = $('body').hasClass('view-withKeyboard');
//             var nowWithKeyboard = false;

//                 var diff = Math.abs(originalPotion - ($(window).width() + $(window).height()));
//                 if (diff > 100) nowWithKeyboard = true;

//             $('body').toggleClass('view-withKeyboard', nowWithKeyboard);
//             if (wasWithKeyboard != nowWithKeyboard) {
//                 onKeyboardOnOff(nowWithKeyboard);
//             }
//         }
//     }
// }

// $(document).on('focus blur', 'select, textarea, input[type=text], input[type=date], input[type=password], input[type=email], input[type=number]', function(e){
//     var $obj = $(this);
//     var nowWithKeyboard = (e.type == 'focusin');
//     $('body').toggleClass('view-withKeyboard', nowWithKeyboard);
//     onKeyboardOnOff(nowWithKeyboard);
// });

// $(window).on('resize orientationchange', function(){
//     applyAfterResize();
// });