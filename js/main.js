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
    mute,
    nonext = false

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

var subscribeButton = document.getElementById("mc-embedded-subscribe")
subscribeButton.addEventListener("click", eventSubscribed)

var spotifyCTAs = document.getElementsByClassName("CTAspotify")
for (var i = 0; i < spotifyCTAs.length; i++) {
    spotifyCTAs.item(i).addEventListener("click", eventOpenSpotify)
}

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
        floatingNoteAnimation()

    } else if (playing) {
        if (volumeNumber == album.getAttribute('volume')) {  // if user is interacting with the same album
            clearTimeout(noteTimeout)
            stopMusic()

        } else {                // if user is playing another album
            stopMusic()

            Albums.item(volumeNumber - 1).classList.toggle("play")
            volumeNumber = album.getAttribute('volume')
            floatingNoteAnimation()
            playMusic(album)
        }
    }
}

function next() {
    if (!playing) return
    if (!nonext) {
        nonext = true
        for (var i = 0; i < Vinyls.length; i++) {
            Vinyls.item(i).classList.add("nonext");
        }
    }

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
    floatingNoteAnimation()
    if (mobile) {
        var animation = new TimelineLite()
        animation.to(this, .1, { y: 100, ease: Power1.easeOut })
            .to(this, .4, { y: 0, ease: Back.easeOut.config(1.7) })
    } else {
        var animation = new TimelineLite()
        animation.to(this, .1, { x: -100, ease: Power1.easeOut })
            .to(this, .4, { x: 0, ease: Back.easeOut.config(1.7) })
    }
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
        eventSongPLayed()
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
        // track.stop()
        // album.classList.toggle("play")
    })
}

const scroll = new LocomotiveScroll({       // Enable locomotive scroll
    el: document.querySelector('[data-scroll]'),
    smooth: true,
    direction: "horizontal"
});




// --------------------------------
// floating note animation
// --------------------------------

const speed = .2
function floatingNoteAnimation() {
    TweenMax.killTweensOf(Notes[n]);

    var pos = Albums[volumeNumber - 1].getBoundingClientRect()

    if (!mobile) {
        var startX = pos.right + (10 * Math.random()) - 120
        var startY = pos.top
    } else {
        var startX = pos.right + (10 * Math.random()) - 80
        var startY = pos.top -230
    }
    var endX = startX + (100 * Math.random())
    var endY = startY + (150 * Math.random()) - 200

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

    // noteTimeout = setTimeout(floatingNoteAnimation, 500)
    n = n + 1
    if (n >= Notes.length) { n = 0 }

}

// --------------------------------
// press "m" to Mute
// --------------------------------

document.addEventListener('keydown', logKey);

function logKey(e) {
    if (e.isComposing || e.keyCode === 77) {
        mute ^= true;
        return;
    }
}

function eventSongPLayed() {
    // gtag('event', 'custom_playMusic');
}

function eventSubscribed() {
    // gtag('event', 'custom_subscribed');
}

function eventOpenSpotify() {
    // gtag('event', 'custom_opened_Spotify_new');
}

// --------------------------------
// Modal -- Learn more 
// --------------------------------

// Get the modal
var modal = document.getElementById("modalMore");

// Get the button that opens the modal
var btn = document.getElementById("learnmore");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}



// --------------------------------
// Hide logo when keyboard is open
// --------------------------------

const logo = document.getElementById("logo");
const emailField = document.querySelector('input[type="email"]');

emailField.addEventListener('focus', (event) => {
    logo.classList.add("outofsight");
});

emailField.addEventListener('blur', (event) => {
    logo.classList.remove("outofsight");
});



