import type { Component, ParentProps } from 'solid-js';
import logo from '../assets/logo.png';

const Layout: Component<ParentProps> = (props) => {
    return (
        <div class="app-container">
            <nav class="navbar">
                <div class="navbar-content">
                    <a href="/" class="logo-container">
                        <img src={logo} alt="Dev Toolbox Logo" class="logo-img" />
                        <span>Dev Toolbox</span>
                    </a>
                </div>
            </nav>
            <main class="main-content">
                {props.children}
            </main>
        </div>
    );
};

export default Layout;
