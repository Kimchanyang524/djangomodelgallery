export function initializeTheme() {
  document.addEventListener("DOMContentLoaded", () => {
    const colorSchemeQuery = window.matchMedia("(prefers-color-scheme: dark)");

    function setColorScheme(e) {
      if (e.matches) {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
    }

    setColorScheme(colorSchemeQuery);

    colorSchemeQuery.addListener(setColorScheme);
  });
}
