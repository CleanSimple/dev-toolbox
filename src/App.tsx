import type { Component } from 'solid-js';
import { Router } from "@solidjs/router";
import { routes } from "./routes";
import ServiceWorkerRegistration from "./components/pwa/ServiceWorkerRegistration";

const App: Component = () => {
    return (
        <>
            <ServiceWorkerRegistration />

            <Router>{routes}</Router>
        </>
    );
};

export default App;
