; (function setupNavigationHandlers(document, window) {
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  function stripHash(href) {
    return href.replace(/#[\s\S]*$/, '')
  }

  function isInternalURL(url) {
    let hasHostName = url.replace(/(\..*?)\/.*$/, '$1').indexOf(window.location.host) > -1;
    return hasHostName || (/^\//.test(url) && !/^\/\//.test(url));
  }

  function onNavigation(event, from, to) {
    if (!isSafari && isInternalURL(to) && stripHash(from) !== stripHash(to)) {
      function transitionOut() {
        // just once
        document.body.removeEventListener("transitionend", transitionOut)
        window.location.href = to
        setTimeout(() => {
          // just in case they didn't go anywhere
          document.body.style.opacity = 1;
        }, 2000)
      }

      document.body.addEventListener("transitionend", transitionOut)
      document.body.style.opacity = 0;
      event.preventDefault()
      return false
    }
  }
  function findParent(element, pred) {
    if (pred(element)) return element
    else if (element.parentElement) return findParent(element.parentElement, pred)
    else return null
  }
  function onWindowClick(event) {
    let targetA = findParent(event.target, el => el.tagName === 'A')
    if (event.isTrusted && targetA) {
      return onNavigation(event, window.location.href, targetA.href)
    }
  }
  window.addEventListener("click", onWindowClick)

  // set onunload to flag cache busting
  document.body.onunload = function(){ window.__cachebust = Math.random() }
  setTimeout(body => body.style.opacity = 1, 50, document.body)
})(document, window);

