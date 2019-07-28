function invertColors() {
  const colorsDark = localStorage.getItem("colorsDark")
  document.body.className = document.body.className.replace(/(\s+|\b)theme-night(\s+|\b|$)/, '')
  if (colorsDark) {
    document.body.className += ' theme-night'
  }
  localStorage.setItem("colorsDark", colorsDark ? "" : "1")
}
window.invertColors = invertColors
invertColors()
invertColors()
