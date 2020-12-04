var playing = false

var sound = new Howl({
    src: ['tracks/song.mp3'],
    autoplay: false,
    loop: false,
    volume: .2,
    onend: function () {
        console.log('Finished!');
    }
});


var playButton = document.getElementById("play")
playButton.addEventListener("click", playPause);
function playPause() {
    if (!playing) {
        // sound.fade(0.0, 0.7, 5000)
        // sound.volume(.7)
        sound.play()
        playing = true
    } else if (playing) {
        sound.stop()
        playing = false
    }
}


