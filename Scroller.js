class Scroller {
    constructor(rootSelector) {
        const rootElement = document.querySelector(rootSelector);
        this.sections = document.querySelectorAll('section');
        const sectionArray = [...this.sections];

        // this.currenSectionIndex = sectionArray.findIndex(item => {
        //     return this.isScrolledIntoView(item)
        // }); 
        // przeszukuje, który index tablicy ma true. Kazdy element wysyłam do funkcji isScrolledIntoView, która zwraca true lub false. Pierwszy true zwróci index tablicy. 
        // KRÓTSZY SPOSÓB PONIŻEJ

        const currenSectionIndex = sectionArray.findIndex(this.isScrolledIntoView); // index elementu który jest aktualnie widoczny
        // TO SAMO findIndex(element => { return this.isScrolledIntoView(element)})
        this.isThrottled = false;

        this.currenSectionIndex = currenSectionIndex < 0 ? 0 : currenSectionIndex; // zabezpieczenie, aby currentSection nie był mneijszy od zera
        // DRUGI SPOSOB
        // = Math.max(currentSectionIndex, 0)

        console.log(`Wyświetlam stronę nr ${this.currenSectionIndex + 1}`);

        this.drawNavigation();
    }

    isScrolledIntoView(pojedynczaSekcja) { // wywołanie funkcji która sprawdza czy dana sekcja (strona), jest obecnie wyswietlana. zwraca true lub false!
        const rect = pojedynczaSekcja.getBoundingClientRect();
        const elemTop = rect.top;
        const elemBottom = Math.floor(rect.bottom);

        const isVisible = ((elemTop >= 0) && (elemBottom <= window.innerHeight));

        return isVisible; // true lub false
    }

    listenScroll = (e) => {
        if (this.isThrottled) return;
        this.isThrottled = true;

        setTimeout(() => { // funkcja strzałkowa BINDUJE
            this.isThrottled = false;
        }, 1100);

        const direction = e.wheelDelta < 0 ? 1 : -1; // określamy kierunek
        this.scroll(direction); // wywołanie metody scroll
    }

    scroll = (direction) => { // BIND za pomoca f strzałkowej   
        if (direction === 1) {
            const isLastSection = this.currenSectionIndex === this.sections.length - 1; // jezeli current jest takie same jak section.lengt to...
            if (isLastSection) return; // jezeli jest last section to wyjdz
        }
        else if (direction === -1) {
            const firstSection = this.currenSectionIndex === 0;
            if (firstSection) return;
        }
        this.currenSectionIndex += direction;
        this.scrollCurrentSection();
    }

    scrollCurrentSection = () => {
        this.selectActiveNavItem();
        this.sections[this.currenSectionIndex].scrollIntoView({ // metoda przewijajaca na konkretna sekcje
            behavior: 'smooth',
            block: 'start',
        })
    }

    // metoda rysująca nawigację, kropki

    drawNavigation = () => {
        this.navigationContainer = document.createElement('aside');
        this.navigationContainer.setAttribute('class', 'scroller__navigation');
        const list = document.createElement('ul');

        this.sections.forEach((section, index) => {
            const listItem = document.createElement('li');

            listItem.addEventListener('click', () => {
                this.currenSectionIndex = index;
                this.scrollCurrentSection();
            })

            list.appendChild(listItem);
        })

        this.navigationContainer.appendChild(list);

        document.body.appendChild(this.navigationContainer);
        this.selectActiveNavItem();
    }

    selectActiveNavItem = () => { // metoda podswietlająca aktualnie uzywana kropkę
        if (this.navigationContainer) { // zabezpieczenie

            const navigationItem = this.navigationContainer.querySelectorAll('li');

            navigationItem.forEach((item, index) => {
                if (index === this.currenSectionIndex) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            })
        }
    }

}