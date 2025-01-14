import { lazy, Suspense } from 'react';
import { Route, RouteObject } from 'react-router-dom';
import RouteGuard from './route-guard';

const FourOhFour = lazy(async () => await import('@/pages/404'));
const GetStarted = lazy(async () => await import('@/pages/landing'));
const Dashboard = lazy(async () => await import('@/pages/dashboard'));
const Overview = lazy(async () => await import('@/pages/overview'));
const PlayerProfile = lazy(async () => await import('@/pages/profile'));
const Leaderboard = lazy(async () => await import('@/pages/leaderboard'));
// const PlayerExport = lazy(async () => await import('@/pages/export'));
// const Alchemy = lazy(async () => await import('@/pages/alchemy'));

type RouteConfigs = {
    path: string;
    protected: boolean;
};

export const routePaths: RouteConfigs[] = [
    // { path: '/', protected: false },
    { path: 'dashboard', protected: true },
    { path: 'overview', protected: true },
    { path: 'players', protected: true },
    { path: 'leaderboard', protected: false },
    // { path: 'export', protected: false },
    // { path: 'alchemy', protected: false },
];

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
        path: ':clan_token',
        element: (
            <RouteGuard>
                <Suspense fallback={<></>}>
                    <Dashboard />
                </Suspense>
            </RouteGuard>
        ),
    },
    {
        path: 'dashboard',
        element: (
            <RouteGuard>
                <Suspense fallback={<></>}>
                    <Dashboard />
                </Suspense>
            </RouteGuard>
        ),
    },
    {
        path: 'overview',
        element: (
            <RouteGuard>
                <Suspense fallback={<></>}>
                    <Overview />
                </Suspense>
            </RouteGuard>
        ),
    },
    {
        path: 'leaderboard',
        element: (
            <RouteGuard>
                <Suspense fallback={<></>}>
                    <Leaderboard />
                </Suspense>
            </RouteGuard>
        ),
    },
    // {
    //     path: 'export',
    //     element: (
    //         <Suspense fallback={<></>}>
    //             <PlayerExport />
    //         </Suspense>
    //     ),
    // },
    // {
    //     path: 'alchemy',
    //     element: (
    //         <Suspense fallback={<></>}>
    //             <Alchemy />
    //         </Suspense>
    //     ),
    // },
    {
        path: 'players',
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

const createRoutes = (routes: RouteObject[]) => {
    return routes.map((route, index) => <Route key={index} path={route.path} element={route.element} index={route.index} />);
};

export const Routes = createRoutes(routesConfig);
