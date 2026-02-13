import type { RouteDefinition } from "@solidjs/router";
import Home from "./pages/home.tsx";
import Layout from "./components/Layout.tsx";

export const routes: RouteDefinition[] = [
    {
        path: "/",
        component: Layout,
        children: [
            {
                path: "/",
                component: Home,
            },
        ],
    },
]