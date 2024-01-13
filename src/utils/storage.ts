const storagePrefix = 'titan_tech_';

const storage = {
    token: {
        get: () => {
            return JSON.parse(window.localStorage.getItem(`${storagePrefix}token`) as string);
        },
        set: (val: string) => {
            window.localStorage.setItem(`${storagePrefix}token`, JSON.stringify(val));
        },
        clear: () => {
            window.localStorage.removeItem(`${storagePrefix}token`);
        },
    },
    theme: {
        get: () => {
            return JSON.parse(window.localStorage.getItem(`${storagePrefix}darkMode`) as string);
        },
        set: (val: string) => {
            window.localStorage.setItem(`${storagePrefix}darkMode`, JSON.stringify(val));
        },
        clear: () => {
            window.localStorage.removeItem(`${storagePrefix}darkMode`);
        },
    },
};

export default storage;
