var track,
    trackDelay,
    playing,
    volumeNumber,
    trackNumber,
    randomCrackle,
    volumeSize = 5,
    album,
    vynil,
    cover,
    noteTimeout,
    noteDelay,
    n = 0,
    mobile,
    mute

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    mobile = true
}


var Crackles = new Array()
var crackle0 = new Howl({
    src: ['tracks/crackle0.mp3'],
    autoplay: false,
    loop: false,
    volume: 1,
})
Crackles.push(crackle0)

var crackle1 = new Howl({
    src: ['tracks/crackle1.mp3'],
    autoplay: false,
    loop: false,
    volume: 1,
})
Crackles.push(crackle1)

var crackle2 = new Howl({
    src: ['tracks/crackle2.mp3'],
    autoplay: false,
    loop: false,
    volume: 1,
})
Crackles.push(crackle2)


var Albums = document.getElementsByClassName("album")
var Covers = document.getElementsByClassName("cover")
for (var i = 0; i < Covers.length; i++) {
    Covers.item(i).addEventListener("click", playPause)
}
var Vinyls = document.getElementsByClassName("vinyl")
for (var i = 0; i < Vinyls.length; i++) {
    Vinyls.item(i).addEventListener("click", next)
}
var Notes = document.getElementsByClassName("note")

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
        volumeNumber = album.getAttribute('volume')
        playMusic(album)
        playNotes()

    } else if (playing) {
        if (volumeNumber == album.getAttribute('volume')) {  // if user is interacting with the same album
            clearTimeout(noteTimeout)
            stopMusic()

        } else {                // if user is playing another album
            stopMusic()

            Albums.item(volumeNumber - 1).classList.toggle("play")
            volumeNumber = album.getAttribute('volume')
            playNotes()
            playMusic(album)
        }
    }
}

function next() {
    var animation = new TimelineLite()
    animation.to(this, .1, { x: -100, ease: Power1.easeOut })
        .to(this, .4, { x: 0, ease: Back.easeOut.config(1.7) })

    clearTimeout(trackDelay)
    Crackles[randomCrackle].stop()
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
    if (!mute) {
        playRandomCrackle()
        track.play()
    }
    playNotes()
    var animation = new TimelineLite()
    animation.to(this, .1, { x: -100, ease: Power1.easeOut })
        .to(this, .4, { x: 0, ease: Back.easeOut.config(1.7) })
}

function playMusic(album) {
    playing = true
    playRandomCrackle()
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
    if (!mute) {
        trackDelay = setTimeout(function () {   // start the track 3s after crackle sound
            track.play()
        }, 1000)
    }
}

function stopMusic() {
    clearTimeout(trackDelay)
    Crackles[randomCrackle].stop()
    track.stop()
    playing = false
}

function playRandomCrackle() {
    randomCrackle = getRandomInt(3) - 1
    Crackles[randomCrackle].play()
}

function getRandomInt(max) {                // random int between 1 and max included
    return Math.floor(Math.random() * Math.floor(max) + 1)
}

allCTA = document.getElementsByClassName("CTAspotify")
for (var i = 0; i < allCTA.length; i++) {
    allCTA.item(i).addEventListener("click", function () {
        track.stop()
        album.classList.toggle("play")
    })
}

const scroll = new LocomotiveScroll({       // Enable locomotive scroll
    el: document.querySelector('[data-scroll]'),
    smooth: true,
    direction: "horizontal"
});




// --------------------------------
// PLAY 1 NOTE A
// --------------------------------


var speed = .2
function playNotes() {
    if (!mobile) {
        TweenMax.killTweensOf(Notes[n]);

        var pos = Albums[volumeNumber - 1].getBoundingClientRect()
        var startX = pos.right + (10 * Math.random()) -120
        var startY = pos.top 
        var endX = startX + (50 * Math.random())
        var endY = startY + (200 * Math.random()) - 200

        new TimelineMax()
            // show the image
            .set(Notes[n], {
                startAt: { opacity: 0, scale: 1 },
                opacity: 1,
                scale: 1,
                rotation: 40 - 80 * Math.random(),
                zIndex: 1,
                x: startX,
                y: startY
            }, 0)
            // animate position
            .to(Notes[n], 2, {
                ease: Expo.easeOut,
                // ease: "power1.inOut",
                rotation: 60 - 120 * Math.random(),
                x: endX,
                y: endY
            }, 0)
            // then make it disappear 
            .to(Notes[n], .5, {
                ease: Power1.easeOut,
                opacity: 0
            }, 1)
            // scale down the image
            .to(Notes[n], .5, {
                ease: Quint.easeOut,
                scale: 0.2
            }, 1);

        // noteTimeout = setTimeout(playNotes, 500)
        n = n + 1
        if (n >= Notes.length) { n = 0 }
    }
}

// --------------------------------
// M to Mute
// --------------------------------

document.addEventListener('keydown', logKey);

function logKey(e) {
    if (e.isComposing || e.keyCode === 77) {
        mute ^= true;
        return;
    }
}


// --------------------------------
// PLAY MANY NOTES
// --------------------------------


// function playNotes() {
//     if (!mobile) {
//         TweenMax.killTweensOf(Notes[n]);

//         var pos = Albums[volumeNumber - 1].getBoundingClientRect()
//         var startX = pos.right + (100 * Math.random()) - 80
//         var startY = pos.top + (100 * Math.random()) - 40
//         var endX = startX
//         var endY = startY - 50 + (100 * Math.random()) - 80

//         new TimelineMax()
//             // show the image
//             .set(Notes[n], {
//                 startAt: { opacity: 0, scale: 1 },
//                 opacity: 1,
//                 scale: 1,
//                 rotation: 40 - 80 * Math.random(),
//                 zIndex: 1,
//                 x: startX,
//                 y: startY
//             }, 0)
//             // animate position
//             .to(Notes[n], 1 * tempo, {
//                 ease: Expo.easeOut,
//                 // ease: "power1.inOut",
//                 rotation: 40 - 80 * Math.random(),
//                 x: endX,
//                 y: endY
//             }, 0)
//             // then make it disappear 
//             .to(Notes[n], .5 * tempo, {
//                 ease: Power1.easeOut,
//                 opacity: 0
//             }, 0.4)
//             // scale down the image
//             .to(Notes[n], .5 * tempo, {
//                 ease: Quint.easeOut,
//                 scale: 0.2
//             }, 0.4);

//         noteTimeout = setTimeout(playNotes, 500)
//         n = n + 1
//         if (n >= Notes.length) { n = 0 }
//     }
// }


// --------------------------------
// MOBILE KEYBOARD DETECTOR
// --------------------------------


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


