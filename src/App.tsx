import type { Component } from 'solid-js';

import { Router } from '@solidjs/router';
import ServiceWorkerRegistration from './components/pwa/ServiceWorkerRegistration';
import { ThemeProvider } from './contexts/ThemeContext';
import { routes } from './routes';

const App: Component = () => {
    return (
        <>
            <ThemeProvider>
                <ServiceWorkerRegistration />

                <Router>{routes}</Router>
            </ThemeProvider>
        </>
    );
};

export default App;
