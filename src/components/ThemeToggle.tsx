import { useTheme } from '@/contexts/ThemeContext';
import { Monitor, Moon, Sun } from 'lucide-solid';
import { Match, Switch } from 'solid-js';

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    const buttonTitle = () => {
        switch (theme()) {
            case 'system':
                return 'Auto (System Theme)';
            case 'dark':
                return 'Dark Mode';
            case 'light':
                return 'Light Mode';
        }
    };

    return (
        <button
            onClick={toggleTheme}
            class='p-2 rounded-full text-body hover:bg-accent hover:text-on-accent transition-colors'
            aria-label='Toggle Theme'
            title={buttonTitle()}
        >
            <Switch>
                <Match when={theme() == 'system'}>
                    <Monitor size={20} />
                </Match>
                <Match when={theme() == 'light'}>
                    <Sun size={20} />
                </Match>
                <Match when={theme() == 'dark'}>
                    <Moon size={20} />
                </Match>
            </Switch>
        </button>
    );
}
