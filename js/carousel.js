
function moveRight(clickedArrow) {
    const carousel = clickedArrow.parentElement
    const images = carousel.querySelectorAll('.carousel__image-frame')
    const imageWidth = images[0].offsetWidth
    const numberOfImages = images.length

    
    //Loop if necessary
    if(isCloseTo(carousel.scrollLeft, imageWidth*(numberOfImages-1), imageWidth/2)){
        carousel.scrollTo({
            left: 0,
            behavior: "instant"
        })
    }

    const newPosition = carousel.scrollLeft + imageWidth

    carousel.scrollTo({
        left: newPosition,
        behavior: "smooth"
    })
}

function moveLeft(clickedArrow) {
    const carousel = clickedArrow.parentElement
    const images = carousel.querySelectorAll('.carousel__image-frame')
    const imageWidth = images[0].offsetWidth
    const numberOfImages = images.length

    if(isCloseTo(carousel.scrollLeft, 0, imageWidth)){
        carousel.scrollTo({
            left: imageWidth*numberOfImages,
            behavior: "instant"
        })
    }

    carousel.scrollTo({
        left: carousel.scrollLeft - imageWidth,
        behavior: "smooth"
    })
}

//substitute for scrollMax not being supported on most browsers
function isCloseTo(i,j,tolerance){
    return Math.abs(i-j) < tolerance;
}

