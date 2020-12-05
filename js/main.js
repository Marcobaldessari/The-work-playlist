var track,
    trackDelay,
    playing,
    volumeNumber,
    trackNumber,
    volumeSize = 3

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
for (var i = 0; i < Albums.length; i++) {
    Albums.item(i).addEventListener("click", playPause);
}

function playPause() {

    this.classList.toggle("play")
    if (!playing) {
        playMusic(this)
    } else if (playing) {
        if (volumeNumber == this.getAttribute('volume')) {  // if user is interacting with the same album
            stopMusic()
        } else {                // if user is playing another album
            stopMusic()
            Albums.item(volumeNumber - 1).classList.toggle("play")
            playMusic(this)
        }
    }
}

function stopMusic() {
    clearTimeout(trackDelay)
    crackle.stop()
    track.stop()
    playing = false
}

function playMusic(album) {
    crackle.volume(1)
    crackle.play()
    volumeNumber = album.getAttribute('volume')
    trackNumber = getRandomInt(volumeSize)
    track = new Howl({
        src: ['tracks/volume' + volumeNumber + '/' + trackNumber + '.mp3'],
        autoplay: false,
        loop: false,
        volume: .2,
        onend: function () {
            console.log('Finished!');
        }
    });
    trackDelay = setTimeout(function () {   // start the track 3s after crackle sound
        track.play()
    }, 3000);
    playing = true
}

function getRandomInt(max) {                // random int between 1 and max included
    return Math.floor(Math.random() * Math.floor(max) + 1);
}

const scroll = new LocomotiveScroll({       // Enable locomotive scroll
    el: document.querySelector('[data-scroll]'),
    smooth: true,
    direction: "horizontal"
});