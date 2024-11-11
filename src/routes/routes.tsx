import { lazy, Suspense } from 'react';
import { Route, RouteObject } from 'react-router-dom';
import RouteGuard from './route-guard';

// Lazy-loaded page components
const GetStarted = lazy(async () => await import('@/pages/landing'));
const Dashboard = lazy(async () => await import('@/pages/dashboard'));
const Overview = lazy(async () => await import('@/pages/overview'));
const PlayerProfile = lazy(async () => await import('@/pages/profile'));
const PlayerExport = lazy(async () => await import('@/pages/export'));
const FourOhFour = lazy(async () => await import('@/pages/404'));

// Define the routes configuration, applying RouteGuard to guarded routes
const routesConfig: RouteObject[] = [
    {
        path: '/',
        element: (
            <Suspense fallback={<></>}>
                <GetStarted />
            </Suspense>
        ),
        index: true,
    },
    {
        path: ':clan_token', // Route with token in URL
        element: (
            <RouteGuard>
                <Suspense fallback={<></>}>
                    <Dashboard />
                </Suspense>
            </RouteGuard>
        ),
    },
    {
        path: 'dashboard', // Guarded route
        element: (
            <RouteGuard>
                <Suspense fallback={<></>}>
                    <Dashboard />
                </Suspense>
            </RouteGuard>
        ),
    },
    {
        path: 'overview', // Guarded route
        element: (
            <RouteGuard>
                <Suspense fallback={<></>}>
                    <Overview />
                </Suspense>
            </RouteGuard>
        ),
    },
    {
        path: 'player-export-editor', // Public route, not guarded
        element: (
            <Suspense fallback={<></>}>
                <PlayerExport />
            </Suspense>
        ),
    },
    {
        path: 'players', // Guarded route
        element: (
            <RouteGuard>
                <Suspense fallback={<></>}>
                    <PlayerProfile />
                </Suspense>
            </RouteGuard>
        ),
    },
    {
        path: '*',
        element: (
            <Suspense fallback={<></>}>
                <FourOhFour />
            </Suspense>
        ),
    },
];

// Function to create Route elements from routesConfig
const createRoutes = (routes: RouteObject[]) => {
    return routes.map((route, index) => <Route key={index} path={route.path} element={route.element} index={route.index} />);
};

export const Routes = createRoutes(routesConfig);
