import type { Component } from 'solid-js';

import { Router } from '@solidjs/router';
import ServiceWorkerRegistration from './components/pwa/ServiceWorkerRegistration';
import { routes } from './routes';

const App: Component = () => {
    return (
        <>
            <ServiceWorkerRegistration />

            <Router>{routes}</Router>
        </>
    );
};

export default App;
