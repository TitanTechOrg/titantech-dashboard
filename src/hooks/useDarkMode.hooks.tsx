import { usePreferencesStore } from '@/stores/preferences.store';
import { useEffect, useState } from 'react';

const useDarkMode = () => {
  const { darkMode: darkModeStorage, setDarkMode: setDarkModeStorage } =
    usePreferencesStore();
  const [darkMode, setDarkMode] = useState<boolean>(darkModeStorage);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    setDarkModeStorage(darkMode);
  }, [darkMode, setDarkMode, setDarkModeStorage]);

  return [darkMode, setDarkMode] as const;
};
export default useDarkMode;
