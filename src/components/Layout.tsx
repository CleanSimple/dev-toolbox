import type { Component, ParentProps } from 'solid-js';
import logo from '@/assets/logo.svg';
import ThemeToggle from './ThemeToggle';

const Layout: Component<ParentProps> = (props) => {
    return (
        <div class="min-h-screen flex flex-col bg-app text-main transition-colors duration-200">
            <nav class="bg-surface shadow px-8 py-4 border-b border-subtle transition-colors duration-200">
                <div class="max-w-7xl mx-auto flex items-center justify-between">
                    <a href="/" class="flex items-center gap-3 font-bold text-xl text-main">
                        <img src={logo} alt="Dev Toolbox Logo" class="h-8 w-auto" />
                        <span>Dev Toolbox</span>
                    </a>
                    <ThemeToggle />
                </div>
            </nav>
            <main class="flex-1 w-full max-w-7xl mx-auto p-8">
                {props.children}
            </main>
        </div>
    );
};

export default Layout;
