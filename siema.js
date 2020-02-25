document.addEventListener('DOMContentLoaded', function () { // zabezpieczenie js. poczeka az strona sie cała załaduje. 
    console.log('DOM fully loaded and parsed');

    const rootElement = document.querySelector('.main');
    const sections = document.querySelectorAll('section');

    document.addEventListener('mousewheel', function (event) {
        console.log(event.wheelDelta); // o ile poruszylismy scrolla
    })
})

