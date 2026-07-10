import { ServiceWorkerRegistration } from '@/components/pwa/ServiceWorkerRegistration';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Router } from '@solidjs/router';
import { routes } from './routes';

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
