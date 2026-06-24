import { createSignal, createEffect, onMount, onCleanup, Switch, Match } from 'solid-js';
import { Moon, Sun, Monitor } from 'lucide-solid';
import type { Component } from 'solid-js';

const Themes = ["system", "light", "dark"] as const;
type Theme = typeof Themes[number];

const isTheme = (value: string): value is Theme => {
    return (Themes as readonly string[]).includes(value);
};

const storage = {
    getTheme(): Theme | null {
        const theme = localStorage.getItem("theme");
        return theme && isTheme(theme) ? theme : null
    },
    setTheme(theme: Theme) {
        localStorage.setItem("theme", theme);
    }
}

const ThemeToggle: Component = () => {
    const [theme, setTheme] = createSignal<Theme>(
        storage.getTheme() ?? 'system'
    );
    const toggleTheme = () => {
        setTheme(prev => {
            switch (prev) {
                case "system": return "light";
                case "light": return "dark";
                case "dark": return "system";
            }
        });
    };

    const applyTheme = (theme: Theme) => {
        document.documentElement.dataset.theme = theme === "system"
            ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : "light")
            : theme;
    };

    createEffect(() => {
        const currentTheme = theme();
        applyTheme(currentTheme);
        storage.setTheme(currentTheme);
    });

    onMount(() => {
        // handle system theme change
        const handleSystemThemeChange = () => {
            if (theme() === 'system') applyTheme('system');
        };

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', handleSystemThemeChange);
        onCleanup(() => mediaQuery.removeEventListener('change', handleSystemThemeChange));
    });

    return (
        <button
            onClick={toggleTheme}
            class="p-2 rounded-full text-body hover:bg-accent hover:text-on-accent transition-colors"
            aria-label="Toggle Theme"
            title={theme() === 'system' ? 'Auto (System Theme)' : theme() === 'dark' ? 'Dark Mode' : 'Light Mode'}
        >
            <Switch>
                <Match when={theme() == "system"}>
                    <Monitor size={20} />
                </Match>
                <Match when={theme() == "light"}>
                    <Sun size={20} />
                </Match>
                <Match when={theme() == "dark"}>
                    <Moon size={20} />
                </Match>
            </Switch>
        </button>
    );
}

export default ThemeToggle;
