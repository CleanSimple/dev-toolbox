import { createSignal, createEffect, onMount, onCleanup } from 'solid-js';
import { Moon, Sun, Monitor } from 'lucide-solid';
import type { Component } from 'solid-js';

const ThemeToggle: Component = () => {
    const [theme, setTheme] = createSignal(
        localStorage.getItem('theme') || 'system'
    );

    const applyTheme = (currentTheme: string) => {
        const root = document.documentElement;
        if (currentTheme === 'dark' || (currentTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    };

    const toggleTheme = () => {
        setTheme(prev => {
            if (prev === 'system') return 'light';
            if (prev === 'light') return 'dark';
            return 'system';
        });
    };

    createEffect(() => {
        const currentTheme = theme();
        applyTheme(currentTheme);
        localStorage.setItem('theme', currentTheme);
    });

    onMount(() => {
        // handle system theme change
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => {
            if (theme() === 'system') applyTheme('system');
        };
        mediaQuery.addEventListener('change', handleChange);
        onCleanup(() => mediaQuery.removeEventListener('change', handleChange));
    });

    const getIcon = () => {
        const currentTheme = theme();
        if (currentTheme === 'system') return <Monitor size={20} />;
        if (currentTheme === 'light') return <Sun size={20} />;
        return <Moon size={20} />;
    };

    return (
        <button
            onClick={toggleTheme}
            class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-200"
            aria-label="Toggle Theme"
            title={theme() === 'system' ? 'Auto (System Theme)' : theme() === 'dark' ? 'Dark Mode' : 'Light Mode'}
        >
            {getIcon()}
        </button>
    );
}

export default ThemeToggle;
