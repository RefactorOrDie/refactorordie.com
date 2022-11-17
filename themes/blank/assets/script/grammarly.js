if (location.search.includes("check-grammar")) {
  for (const item of document.getElementsByClassName("written")) {
    item.contentEditable = "true"
  }
}
