import type { RouteDefinition } from "@solidjs/router";
import Home from "./pages/home.tsx";
import Layout from "./components/Layout.tsx";
import UIPreview from "./pages/ui-preview.tsx";

export const routes: RouteDefinition[] = [
    {
        path: "/",
        component: Layout,
        children: [
            {
                path: "/:flowId?",
                component: Home,
            },
            ...(import.meta.env.DEV
                ? [{
                    path: "/ui-preview",
                    component: UIPreview
                }] : []
            )
        ],
    },
]