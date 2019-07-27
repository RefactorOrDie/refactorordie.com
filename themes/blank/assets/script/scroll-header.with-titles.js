; (function setupScrollHeader(document, window) {
    const STICKY_CLASS = "sticky";
    const heading = { top: 0, heading: null };
    
    let indexes = [heading];
    let lastIndex = -1;
    /** @type HTMLElement */
    let scrollElt = null;
    /** @type HTMLElement */
    let scrollTitleElt = null;

    function top(elt) {
        if (elt.offsetParent) {
            return elt.offsetTop + top(elt.offsetParent);
        }
        return elt.offsetTop;
    }

    function measureAndUpdateHeader() {
        if (scrollElt == null || scrollTitleElt == null) return;
        let i = 0;
        let found = 0;
        let sy = window.scrollY + 10;
        while (i < indexes.length && indexes[i].top < sy) {
            found = i;
            i += 1
        }
        if (found != lastIndex && found < indexes.length) {
            lastIndex = found
            let heading = indexes[found].heading;
            if (heading != null) {
                // found heading
                scrollTitleElt.innerHTML = heading.outerHTML
                scrollTitleElt.firstChild.id = null;
                scrollElt.style.display = "block";
                setTimeout(() => scrollElt.classList.add(STICKY_CLASS), 10)
                // console.log({ sy, found, top: indexes[found].top })
                // console.log(heading)
            } else {
                // remove heading
                scrollTitleElt.innerHTML = ""
                scrollElt.style.display = null;
                scrollElt.classList.remove(STICKY_CLASS)
            }
        }
    }

    function index() {
        scrollElt = document.getElementById("scroll-heading");
        scrollTitleElt = document.getElementById("scroll-heading-title");
        indexes = Array.from(document.querySelectorAll("h1, h2, h3, h4, h5")).map(heading => {
            return ({
                top: top(heading),
                heading: heading,
            })
        });
        indexes.unshift(heading)
        lastIndex = -1;
        measureAndUpdateHeader()
    }

    setTimeout(index, 1000)

    window.addEventListener("scroll", function onScroll(event) {
        measureAndUpdateHeader()
    })
    window.addEventListener("resize", function onScroll(event) {
        measureAndUpdateHeader()
    })
})(document, window);
