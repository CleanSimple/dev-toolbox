import type { Accessor, ParentProps, Setter } from 'solid-js';

import { createEventHandler } from '@/primitives';
import { createContext, createEffect, createSignal, useContext } from 'solid-js';

const Themes = ['system', 'light', 'dark'] as const;
type Theme = typeof Themes[number];
const ThemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

const isTheme = (value: string): value is Theme => {
    return (Themes as readonly string[]).includes(value);
};

const storage = {
    getTheme(): Theme | null {
        const theme = localStorage.getItem('theme');
        return theme && isTheme(theme) ? theme : null;
    },
    setTheme(theme: Theme) {
        localStorage.setItem('theme', theme);
    },
};

interface ThemeContext {
    theme: Accessor<Theme>;
    setTheme: Setter<Theme>;
    toggleTheme: () => void;
    actualTheme: Accessor<'light' | 'dark'>;
}

const ThemeContext = createContext<ThemeContext>();

export function useTheme() {
    const theme = useContext(ThemeContext);

    if (theme === undefined) {
        throw new Error('ThemeProvider is missing');
    }

    return theme;
}

export function ThemeProvider(props: ParentProps) {
    const [theme, setTheme] = createSignal<Theme>(
        storage.getTheme() ?? 'system',
    );
    const [systemTheme, setSystemTheme] = createSignal<'dark' | 'light'>(
        ThemeMediaQuery.matches ? 'dark' : 'light',
    );

    const actualTheme = () => {
        const currentTheme = theme();
        return currentTheme === 'system' ? systemTheme() : currentTheme;
    };

    const toggleTheme = () => {
        setTheme(prev => {
            switch (prev) {
                case 'system':
                    return 'light';
                case 'light':
                    return 'dark';
                case 'dark':
                    return 'system';
            }
        });
    };

    createEffect(() => {
        document.documentElement.dataset['theme'] = actualTheme();
        storage.setTheme(theme());
    });

    // handle system theme change
    createEventHandler(ThemeMediaQuery, 'change', (event) => {
        setSystemTheme(event.matches ? 'dark' : 'light');
    });

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, actualTheme }}>
            {props.children}
        </ThemeContext.Provider>
    );
}
