import type { RouteDefinition } from '@solidjs/router';

import { Layout } from '@/components/Layout.tsx';
import { FlowRunner, Flows } from '@/pages/Flow';
import { Home } from '@/pages/Home.tsx';
import { UIPreview } from '@/pages/UIPreview.tsx';

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
                path: 'flows',
                children: [
                    {
                        path: '/',
                        component: Flows,
                    },
                    {
                        path: '/:flowId',
                        component: FlowRunner,
                    },
                ],
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
