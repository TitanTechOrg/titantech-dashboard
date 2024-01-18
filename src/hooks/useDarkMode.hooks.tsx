import storage from '@/utils/storage';
import { useEffect, useState } from 'react';

const useDarkMode = () => {
    const [darkMode, setDarkMode] = useState<boolean>(storage.theme.get() === 'true');

    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode);
        storage.theme.set(String(darkMode));
    }, [darkMode]);

    return [darkMode, setDarkMode] as const;
};
export default useDarkMode;
