// @ts-check
(function createLinksFromElementsWithId(document) {
  /** @returns {Element} */
  function createElement(tag, text, attrs) {
    if (!attrs) attrs = {};
    if (text) attrs.innerHTML = text;
    let el = document.createElement(tag);
    return Object.assign(el, attrs);
  }

  function prepend(el, elop) {
    if (el.firstChild) el.insertBefore(elop, el.firstChild);
    else el.appendChild(elop);
  }

  const linkStyle = ["color", "text-decoration", "position"]
    .map((a) => a + ": inherit")
    .join(";");

  for (const headingElt of document.querySelectorAll(
    "h1[id],h2[id],h3[id],h4[id],h5[id],h6[id]"
  )) {
    let label = `Anchor link for: ${headingElt.textContent}`;
    let a = createElement("a", null, {
      href: `#${headingElt.id}`,
      style: linkStyle,
      title: label,
    });
    a.setAttribute("aria-label", label);
    a.append(...headingElt.childNodes);
    prepend(headingElt, a);
  }
})(document);
