if (location.search.includes("grammarly")) {
  for (const item of document.getElementsByClassName("written")) {
    item.contentEditable = "true"
  }
}
