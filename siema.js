document.addEventListener('DOMContentLoaded', function () { // zabezpieczenie js. poczeka az strona sie cała załaduje. 
    console.log('DOM fully loaded and parsed');
    const scroller = new Scroller('.main');
    
    // document.addEventListener('mousewheel', scroller.listenScroll); // wersja skrócona. e bedzie automatycznie przekazany do listenScroll
    document.addEventListener('mousewheel', function (e) {
        scroller.listenScroll(e);
    });
})