var playing = false

var crackle = new Howl({
    src: ['tracks/crackle.mp3'],
    autoplay: false,
    loop: false,
    volume: .5,
});


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
    this.classList.toggle("play");
    if (!playing) {
        // sound.fade(0.0, 0.7, 5000)
        // sound.volume(.7)
        crackle.play()
        sound.play()
        playing = true
    } else if (playing) {
        crackle.stop()
        sound.stop()
        playing = false
    }
}


