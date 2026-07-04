import { ServiceWorkerRegistration } from '@/components/pwa/ServiceWorkerRegistration';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { routes } from '@/routes';
import { Router } from '@solidjs/router';

export function App() {
    return (
        <>
            <ThemeProvider>
                <ServiceWorkerRegistration />

                <Router>{routes}</Router>
            </ThemeProvider>
        </>
    );
}
