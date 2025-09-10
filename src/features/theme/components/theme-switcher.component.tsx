import useDarkMode from '@/hooks/useDarkMode.hooks';
import { Button } from '@heroui/react';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useCallback } from 'react';

export function ThemeSwitcher() {
  const [darkMode, setDarkMode] = useDarkMode();

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prevMode: boolean) => !prevMode);
  }, [setDarkMode]);

  return (
    <Button
      onPress={toggleDarkMode}
      isIconOnly
      variant="light"
      aria-label="Toggle between dark and light mode"
    >
      {darkMode ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
}
