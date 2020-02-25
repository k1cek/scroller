document.addEventListener('DOMContentLoaded', function () { // zabezpieczenie js. poczeka az strona sie cała załaduje. 
    console.log('DOM fully loaded and parsed');

    const rootElement = document.querySelector('.main');
    const sections = document.querySelectorAll('section');
    let currenSectionIndex = 0;
    let isThrottled = false;

    document.addEventListener('mousewheel', function (e) {
        if (isThrottled) return;
        isThrottled = true;

        setTimeout(function () {
            isThrottled = false;
        }, 1000);

        // console.log(event.wheelDelta); // o ile poruszylismy scrolla
        const direction = e.wheelDelta < 0 ? 1 : -1; // określamy kierunek
        // console.log(`Wheel delta wynosi: ${e.wheelDelta}`);


        if (direction === 1) {
            const isLastSection = currenSectionIndex === sections.length - 1; // jezeli current jest takie same jak section.lengt to...
            if (isLastSection) return; // jezeli jest last section to wyjdz
        }

        else if (direction === -1) {
            const firstSection = currenSectionIndex === 0;
            if (firstSection) return;
        }

        currenSectionIndex += direction;
        console.log(`current sec index wynosi: ${currenSectionIndex}`);
        console.log(`direction wynosi: ${direction}`);

        sections[currenSectionIndex].scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        })

    })
})

