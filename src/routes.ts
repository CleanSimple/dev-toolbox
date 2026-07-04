import type { RouteDefinition } from '@solidjs/router';

import Layout from './components/Layout.tsx';
import Home from './pages/Home.tsx';
import UIPreview from './pages/UIPreview.tsx';
import Flows from './pages/Flows.tsx';

export const routes: RouteDefinition[] = [
    {
        path: '/',
        component: Layout,
        children: [
            {
                path: '/',
                component: Home,
            },
            {
                path: 'flows/:flowId?',
                component: Flows,
            },
            ...(
                import.meta.env.DEV
                    ? [{
                        path: '/ui-preview',
                        component: UIPreview,
                    }]
                    : []
            ),
        ],
    },
];
