import { addParameters, configure } from "@storybook/react";

import theme from "./theme";

addParameters({
  options: {
    showPanel: false,
    isToolshown: false,
    theme
  }
});

function requireAll(requireContext) {
  return requireContext
    .keys()
    .sort()
    .map(requireContext);
}

function loadStories() {
  // You can require as many stories as you need.
  // requireAll(require.context("../src", true, /\.story\.tsx$/));
  requireAll(require.context("../stories", true, /story\.tsx$/));
}

configure(loadStories, module);
