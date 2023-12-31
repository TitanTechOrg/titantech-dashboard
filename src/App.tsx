import { lazy, Suspense } from 'react';

import { createBrowserRouter, createRoutesFromElements, redirect, Route, RouterProvider, useLocation } from 'react-router-dom';

import ErrorBoundary from './pages/error-boundary/ErrorBoundary.tsx';
import Root from './routes/Root.tsx';
import ErrorPage from './ErrorPage.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextUIProvider, Spinner } from '@nextui-org/react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';

type DashbloardLoaderParams = {
    params: any;
};

const NoTokenPage = lazy(() => import('./pages/landing/index.tsx'));
const Alchemy = lazy(() => import('./pages/alchemy/index.tsx'));
const Dashboard = lazy(() => import('./pages/dashboard'));

function NoMatch() {
    let location = useLocation();

    return (
        <div>
            <h3>
                Oops, couldn't find page <code>{location.pathname}</code>.
            </h3>
        </div>
    );
}

const dashboardSlugLoader = async ({ params }: DashbloardLoaderParams) => {
    if (localStorage.getItem('clan_token')) {
        return redirect('/dashboard');
    } else if (params?.clan_token && params?.clan_token.length === 36) {
        localStorage.setItem('clan_token', params.clan_token);
        return redirect('/dashboard');
    } else {
        return redirect('../../');
    }
};

const dashboardLoader = async ({ params }: DashbloardLoaderParams) => {
    if (localStorage.getItem('clan_token')) {
        return null;
    } else if (params?.clan_token && params?.clan_token.length === 36) {
        localStorage.setItem('clan_token', params.clan_token);
        return null;
    } else {
        return redirect('../../');
    }
};

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
            <Route errorElement={<ErrorPage />}>
                <Route index element={<NoTokenPage />} />

                <Route path=":clan_token" element={<Dashboard />} loader={dashboardSlugLoader} />

                {/* <Route path="dashboard">
                    <Route index element={<Dashboard />} />
                    <Route path=":clan_token" element={<Dashboard />} loader={dashboardSlugLoader} />
                </Route> */}

                <Route path="dashboard" element={<Dashboard />} loader={dashboardLoader} />

                <Route path="alchemy" element={<Alchemy />} />

                <Route path="*" element={<NoMatch />} />
            </Route>
        </Route>
    )
);

const queryClient = new QueryClient();

export default function App() {
    return (
        <ErrorBoundary>
            <QueryClientProvider client={queryClient}>
                <NextUIProvider>
                    <ReactQueryDevtools initialIsOpen={false} />
                    <ToastContainer />
                    <Suspense fallback={<Spinner />}>
                        <RouterProvider router={router} />
                    </Suspense>
                </NextUIProvider>
            </QueryClientProvider>
        </ErrorBoundary>
    );
}
