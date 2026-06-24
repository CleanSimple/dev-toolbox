import type { Component, ParentProps } from 'solid-js';
import logo from '@/assets/logo.svg';
import ThemeToggle from './ThemeToggle';

const Layout: Component<ParentProps> = (props) => {
    return (
        <div class="min-h-screen flex flex-col bg-base text-body">
            <nav class="bg-content shadow px-8 py-4 border-b border-subtle">
                <div class="max-w-7xl mx-auto flex items-center justify-between">
                    <a href="/" class="flex items-center gap-3 font-bold text-xl">
                        <img src={logo} alt="Dev Toolbox Logo" class="h-8 w-auto" />
                        <span class="text-head">Dev Toolbox</span>
                    </a>

                    <div>
                        {/* Nav links */}
                    </div>

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
