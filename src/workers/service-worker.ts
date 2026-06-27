import {
    cleanupOutdatedCaches,
    createHandlerBoundToURL,
    precacheAndRoute,
} from 'workbox-precaching';
import { NavigationRoute, registerRoute } from 'workbox-routing';

declare let self: ServiceWorkerGlobalScope;

self.addEventListener('message', (event) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (event.data?.type === 'SKIP_WAITING') {
        void self.skipWaiting();
    }
});

// self.__WB_MANIFEST is default injection point
precacheAndRoute(self.__WB_MANIFEST);

// clean old assets
cleanupOutdatedCaches();

// to allow work offline
registerRoute(new NavigationRoute(createHandlerBoundToURL('index.html')));

// console.log('Service Worker registered')
