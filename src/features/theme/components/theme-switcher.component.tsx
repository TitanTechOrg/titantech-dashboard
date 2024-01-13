import storage from '@/utils/storage';
import { Button } from '@nextui-org/react';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useState, useEffect } from 'react';

export function ThemeSwitcher() {
    const [darkMode, setDarkMode] = useState(storage.theme.get() === 'true');

    useEffect(() => {
        const isDarkMode = storage.theme.get() === 'true';
        setDarkMode(isDarkMode);
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode);
        storage.theme.set(String(darkMode));
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode((prevMode) => !prevMode);
    };

    return (
        <Button onClick={toggleDarkMode} isIconOnly variant="light" aria-label="Toggle between dark and light mode">
            {darkMode ? <SunIcon /> : <MoonIcon />}
        </Button>
    );
}
