import type { RouteDefinition } from '@solidjs/router';

import { Layout } from '@/components/Layout';
import { FlowRunner, Flows, NewFlow } from '@/pages/Flow';
import { Home } from '@/pages/Home';
import { UIPreview } from '@/pages/UIPreview';

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
                        path: '/new',
                        component: NewFlow,
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
