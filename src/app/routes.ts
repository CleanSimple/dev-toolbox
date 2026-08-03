import type { RouteDefinition } from '@solidjs/router';

import { UIPreviewPage } from '@/app/UIPreviewPage';
import { Layout } from '@/components/Layout';
import { FlowByIdPage, FlowListPage, FlowsLayout, NewFlowPage } from '@/features/flows';
import { HomePage } from '@/features/home';

export const routes: RouteDefinition[] = [
    {
        path: '/',
        component: Layout,
        children: [
            {
                path: '/',
                component: HomePage,
            },
            {
                path: 'flows',
                component: FlowsLayout,
                children: [
                    {
                        path: '/',
                        component: FlowListPage,
                    },
                    {
                        path: '/new',
                        component: NewFlowPage,
                    },
                    {
                        path: '/:flowId',
                        component: FlowByIdPage,
                    },
                ],
            },
            ...(
                import.meta.env.DEV
                    ? [{
                        path: '/ui-preview',
                        component: UIPreviewPage,
                    }]
                    : []
            ),
        ],
    },
];
