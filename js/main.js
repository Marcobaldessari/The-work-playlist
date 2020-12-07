var track,
    trackDelay,
    playing,
    volumeNumber,
    trackNumber,
    randomCrackle,
    volumeSize = 5,
    album,
    vynil,
    cover
    

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

// document.getElementById('myImage').setAttribute('draggable', false);

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
    playRandomCrackle()
    track.play()

    var animation = new TimelineLite()
    animation.to(this, .1, { x: -100, ease: Power1.easeOut })
        .to(this, .4, { x: 0, ease: Back.easeOut.config(1.7) })
}
function stopMusic() {
    clearTimeout(trackDelay)
    Crackles[randomCrackle].stop()
    track.stop()
    playing = false
}

function playMusic(album) {
    playing = true
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
    }, 1000)
}

function playRandomCrackle() {
    // crackle.play()
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



// --------------------------------
// NOTE ANIMATOR
// --------------------------------

{
    // body element
    const body = document.body;
    let hover = false;

    // helper functions
    const MathUtils = {
        // linear interpolation
        lerp: (a, b, n) => (1 - n) * a + n * b,
        // distance between two points
        distance: (x1,y1,x2,y2) => Math.hypot(x2-x1, y2-y1)
    }

    // get the mouse position
    const getMousePos = (ev) => {
        let posx = 0;
        let posy = 0;
        if (!ev) ev = window.event;
        if (ev.pageX || ev.pageY) {
            posx = ev.pageX;
            posy = ev.pageY;
        }
        else if (ev.clientX || ev.clientY) 	{
            posx = ev.clientX + body.scrollLeft + docEl.scrollLeft;
            posy = ev.clientY + body.scrollTop + docEl.scrollTop;
        }
        return {x: posx, y: posy};
    }

    // mousePos: current mouse position
    // cacheMousePos: previous mouse position
    // lastMousePos: last last recorded mouse position (at the time the last image was shown)
    let mousePos = lastMousePos = cacheMousePos = {x: 0, y: 0};
    
    // update the mouse position
    window.addEventListener('mousemove', ev => mousePos = getMousePos(ev));
    var folioItems = document.getElementsByClassName('album');
    for (var i = 0; i < folioItems.length; i++) {
        folioItems[i].addEventListener('mouseover',  function () {hover = true}, false);
        folioItems[i].addEventListener('mouseout',  function () {hover = false}, false);
    }
   
    // document.getElementsByClassName('item').addEventListener("mouseover", function(){
    //     // this.style.color = "red";
    //     console.log("trıgger")
    // });
    // gets the distance from the current mouse position to the last recorded mouse position
    const getMouseDistance = () => MathUtils.distance(mousePos.x,mousePos.y,lastMousePos.x,lastMousePos.y);

    class Image {
        constructor(el) {
            this.DOM = {el: el};
            // image deafult styles
            this.defaultStyle = {
                scale: 1,
                x: 0,
                y: 0,
                opacity: 0
            };
            // get sizes/position
            this.getRect();
            // init/bind events
            this.initEvents();
        }
        initEvents() {
            // on resize get updated sizes/position
            window.addEventListener('resize', () => this.resize());
        }
        resize() {
            // reset styles
            TweenMax.set(this.DOM.el, this.defaultStyle);
            // get sizes/position
            this.getRect();
        }
        getRect() {
            this.rect = this.DOM.el.getBoundingClientRect();
        }
        isActive() {
            // check if image is animating or if it's visible
            return TweenMax.isTweening(this.DOM.el) || this.DOM.el.style.opacity != 0;
        }
    }

    class ImageTrail {
        constructor() {
            // images container
            this.DOM = {content: document.querySelector('.content')};
            // array of Image objs, one per image element
            this.images = [];
            [...this.DOM.content.querySelectorAll('img')].forEach(img => this.images.push(new Image(img)));
            // total number of images
            this.imagesTotal = this.images.length;
            // upcoming image index
            this.imgPosition = 0;
            // zIndex value to apply to the upcoming image
            this.zIndexVal = 1;
            // mouse distance required to show the next image
            this.threshold = 70;
            // render the images
            requestAnimationFrame(() => this.render());
        }
        render() {
            // get distance between the current mouse position and the position of the previous image
            let distance = getMouseDistance();
            // cache previous mouse position
            cacheMousePos.x = MathUtils.lerp(cacheMousePos.x || mousePos.x, mousePos.x, 0.1);
            cacheMousePos.y = MathUtils.lerp(cacheMousePos.y || mousePos.y, mousePos.y, 0.1);

            // if the mouse moved more than [this.threshold] then show the next image
            if ( distance > this.threshold && hover == true) {
                this.showNextImage();

                ++this.zIndexVal;
                this.imgPosition = this.imgPosition < this.imagesTotal-1 ? this.imgPosition+1 : 0;
                
                lastMousePos = mousePos;
            }

            // check when mousemove stops and all images are inactive (not visible and not animating)
            let isIdle = true;
            for (let img of this.images) {
                if ( img.isActive() ) {
                    isIdle = false;
                    break;
                }
            }
            // reset z-index initial value
            if ( isIdle && this.zIndexVal !== 1 ) {
                this.zIndexVal = 1;
            }

            // loop..
            requestAnimationFrame(() => this.render());
        }
        showNextImage() {
            
            console.log("showNextImage is triggered")

            // show image at position [this.imgPosition]
            const img = this.images[this.imgPosition];
            // kill any tween on the image
            TweenMax.killTweensOf(img.DOM.el);

            // new TimelineMax()
            // // show the image
            // .set(img.DOM.el, {
            //     startAt: {opacity: 0, scale: 1},
            //     opacity: 1,
            //     scale: 1,
            //     zIndex: this.zIndexVal,
            //     x: cacheMousePos.x - img.rect.width/2,
            //     y: cacheMousePos.y - img.rect.height/2
            // }, 0)
            // // animate position
            // .to(img.DOM.el, 0.9, {
            //     ease: Expo.easeOut,
            //     x: mousePos.x - img.rect.width/2,
            //     y: mousePos.y - img.rect.height/2
            // }, 0)
            // // then make it disappear
            // .to(img.DOM.el, 1, {
            //     ease: Power1.easeOut,
            //     opacity: 0
            // }, 0.4)
            // // scale down the image
            // .to(img.DOM.el, 1, {
            //     ease: Quint.easeOut,
            //     scale: 0.2
            // }, 0.4);

            new TimelineMax()
            // show the image
            .set(img.DOM.el, {
                startAt: {opacity: 0, scale: 1},
                opacity: 1,
                scale: 1,
                rotation: 40 - 80 * Math.random(),
                zIndex: this.zIndexVal,
                x: mousePos.x - img.rect.width/2,
                y: mousePos.y - img.rect.height/2 - 80
            }, 0)
            // animate position
            .to(img.DOM.el, 1, {
                ease: Expo.easeOut,
                // ease: "power1.inOut",
                rotation: 40 - 80 * Math.random(),
                x: mousePos.x - img.rect.width/2,
                y: mousePos.y - img.rect.height/2 - 150 + (100 * Math.random()) - 80
            }, 0)
            // then make it disappear
            .to(img.DOM.el, .5, {
                ease: Power1.easeOut,
                opacity: 0
            }, 0.4)
            // scale down the image
            .to(img.DOM.el, .5, {
                ease: Quint.easeOut,
                scale: 0.2
            }, 0.4);
        }
    }

    /***********************************/
    /********** Preload stuff **********/

    // Preload images
    const preloadImages = () => {
        return new Promise((resolve, reject) => {
            imagesLoaded(document.querySelectorAll('.content__img'), resolve);
        });
    };
    
    // And then..
    preloadImages().then(() => {
        // Remove the loader
        document.body.classList.remove('loading');
        new ImageTrail();
    });
}