;(function createLinksFromElementsWithId(document) {

  function createElement(tag, text, attrs) {
    if (!attrs) attrs = {};
    if (text) attrs.innerHTML = text;
    let el = document.createElement(tag);
    return Object.assign(el, attrs);
  }

  function prepend(el, elop) {
    el.firstChild ? el.insertBefore(elop, el.firstChild) : el.appendChild(elop);
  }

  function each(items, call) { Array.from(items).forEach(call) }

  const linkStyle = ['color','text-decoration','position'].map(a => a + ': inherit').join(';');

  each(document.querySelectorAll("h1[id],h2[id],h3[id],h4[id],h5[id],h6[id]"), el => {
    let label = `Anchor link for: ${el.textContent}`;
    let a = createElement("a", null, { href: `#${el.id}`, style: linkStyle, title: label });
    a.setAttribute("aria-label", label);
    each(el.childNodes, elc => { elc.remove(); a.appendChild(elc) });
    prepend(el, a);
  });
})(document);
