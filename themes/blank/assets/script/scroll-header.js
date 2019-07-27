; (function setupScrollHeader(document, window) {
    const STICKY_CLASS = "sticky";
    const SHOW_TITLE_CLASS = "show-mini-title";
    const getTop = () => window.innerWidth * 0.025;
    let top = getTop();
    let scrollElt = null

    function calculate() {
        scrollElt = document.getElementById("scroll-heading");
        top = getTop();
        update()
    }

    function update() {
        if (scrollElt == null) return;

        let sy = window.scrollY;
        if (sy > top) {
            // stick heading
            scrollElt.classList.add(STICKY_CLASS)
            if (sy > top + 128) {
                scrollElt.classList.add(SHOW_TITLE_CLASS)
            } else {
                scrollElt.classList.remove(SHOW_TITLE_CLASS)
            }
        } else {
            // unstick heading
            scrollElt.classList.remove(STICKY_CLASS)
            scrollElt.classList.remove(SHOW_TITLE_CLASS)
        }
    }

    window.addEventListener("scroll", () => update())
    window.addEventListener("resize", () => calculate())

    calculate()
})(document, window);
