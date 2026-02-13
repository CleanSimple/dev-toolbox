import type { Component, ParentProps } from 'solid-js';
import logo from '../assets/logo.png';
import ThemeToggle from './ThemeToggle';

const Layout: Component<ParentProps> = (props) => {
    return (
        <div class="app-container dark:bg-gray-900 dark:text-white transition-colors duration-200">
            <nav class="navbar dark:bg-gray-800 dark:border-gray-700 transition-colors duration-200">
                <div class="navbar-content">
                    <a href="/" class="logo-container dark:text-white">
                        <img src={logo} alt="Dev Toolbox Logo" class="logo-img" />
                        <span>Dev Toolbox</span>
                    </a>
                    <ThemeToggle />
                </div>
            </nav>
            <main class="main-content">
                {props.children}
            </main>
        </div>
    );
};

export default Layout;
