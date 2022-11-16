// @ts-check
const prefersDarkMedia = window.matchMedia("(prefers-color-scheme: dark)");
const localStorageThemeKey = "theme";
function updateTheme() {
  const theme = localStorage.getItem(localStorageThemeKey) || "system";
  const useDark =
    theme === "system" ? prefersDarkMedia.matches : theme === "dark";
  document.body.classList.toggle("theme-night", useDark);
}

prefersDarkMedia.addEventListener("change", () => updateTheme());
updateTheme();
