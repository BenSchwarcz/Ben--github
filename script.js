(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('.theme-toggle');
  const label = toggle?.querySelector('.theme-label');
  const themeStorageKey = 'ben-schwarcz-theme';
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  function savedTheme() {
    try {
      const preference = window.localStorage.getItem(themeStorageKey);
      return preference === 'dark' || preference === 'light' ? preference : null;
    } catch {
      return null;
    }
  }

  function applyTheme(theme) {
    const isDark = theme === 'dark';
    root.dataset.theme = theme;
    if (toggle) {
      toggle.setAttribute('aria-pressed', String(isDark));
      toggle.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    }
    if (label) label.textContent = isDark ? 'Light mode' : 'Dark mode';
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.content = isDark ? '#151c19' : '#f6f5f0';
  }

  applyTheme(savedTheme() || (systemPrefersDark.matches ? 'dark' : 'light'));

  toggle?.addEventListener('click', () => {
    const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    try {
      window.localStorage.setItem(themeStorageKey, nextTheme);
    } catch {
      // Theme still works for this visit if browser storage is unavailable.
    }
  });

  systemPrefersDark.addEventListener?.('change', (event) => {
    if (!savedTheme()) applyTheme(event.matches ? 'dark' : 'light');
  });
})();
