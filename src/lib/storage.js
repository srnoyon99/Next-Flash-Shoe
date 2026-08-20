// localStorage access throws in some browser configurations (private mode,
// disabled storage, quota exceeded). These helpers keep such failures from
// taking down the component tree while still reporting them.

export function readStoredValue(key) {
  try {
    return window.localStorage.getItem(key);
  } catch (error) {
    console.warn(`Unable to read "${key}" from localStorage:`, error);
    return null;
  }
}

export function writeStoredValue(key, value) {
  try {
    window.localStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.warn(`Unable to persist "${key}" to localStorage:`, error);
    return false;
  }
}

export function prefersDarkColorScheme() {
  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  } catch (error) {
    console.warn('Unable to read the preferred color scheme:', error);
    return false;
  }
}
