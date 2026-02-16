import type { Component } from 'solid-js';
import { Router } from "@solidjs/router";
import { routes } from "./routes";
import ServiceWorkerRegistration from "./app/ServiceWorkerRegistration";

const App: Component = () => {
    return (
        <>
            <Router>{routes}</Router>
            <ServiceWorkerRegistration />
        </>
    );
};

export default App;
