const shiki = require("shiki");

module.exports = function shikiLoader(source, ...args) {
  return shiki
    .getHighlighter({
      theme: "nord"
    })
    .then(highlighter => {
      return `module.exports = ${JSON.stringify(
        highlighter.codeToHtml(source, "tsx")
      )};`;
    });
};
