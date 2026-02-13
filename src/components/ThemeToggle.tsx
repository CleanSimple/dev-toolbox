import { createSignal, createEffect, onMount } from 'solid-js';
import { Moon, Sun } from 'lucide-solid';

export default function ThemeToggle() {
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

    createEffect(() => {
        const t = theme();
        applyTheme(t);
        if (t !== 'system') {
            localStorage.setItem('theme', t);
        } else {
            localStorage.removeItem('theme');
        }
    });

    onMount(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => {
            if (theme() === 'system') applyTheme('system');
        };
        mediaQuery.addEventListener('change', handleChange);
        // Clean up
        // onCleanup(() => mediaQuery.removeEventListener('change', handleChange));
    });

    const toggleTheme = () => {
        setTheme(prev => {
            if (prev === 'system') {
                return document.documentElement.classList.contains('dark') ? 'light' : 'dark';
            }
            return prev === 'dark' ? 'light' : 'dark';
        });
    };

    return (
        <button
            onClick={toggleTheme}
            class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-200"
            aria-label="Toggle Theme"
            title={theme() === 'system' ? 'System Theme' : theme() === 'dark' ? 'Dark Mode' : 'Light Mode'}
        >
            {theme() === 'dark' || (theme() === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches) ? <Moon size={20} /> : <Sun size={20} />}
        </button>
    );
}
