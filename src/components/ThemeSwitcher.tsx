import { Button } from '@nextui-org/react';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useState, useEffect } from 'react';

export default function ThemeSwitcher() {
    const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');

    useEffect(() => {
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        setDarkMode(isDarkMode);
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode);
        localStorage.setItem('darkMode', String(darkMode));
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
