import { Suspense } from 'react';
import { createBrowserRouter, createRoutesFromElements, redirect, Route, RouterProvider } from 'react-router-dom';
import Root from './routes/Root.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextUIProvider, Spinner } from '@nextui-org/react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';
import { lazyImport } from '@/utils/lazy-import';
import { ErrorBoundary, ErrorPage, FourOhFour } from '@/features/misc';
import { usePreferencesStore } from './stores/preferences.store.ts';

type DashbloardLoaderParams = {
    params: any;
};

const { GetStarted } = lazyImport(() => import('@/features/misc'), 'GetStarted');
const { AlchemyCalculator } = lazyImport(() => import('@/features/alchemy'), 'AlchemyCalculator');
const { Dashboard } = lazyImport(() => import('@/features/misc'), 'Dashboard');
const { Overview } = lazyImport(() => import('@/features/overview'), 'Overview');

const dashboardSlugLoader = async ({ params }: DashbloardLoaderParams) => {
    if (params?.clan_token && params?.clan_token?.length === 36) {
        usePreferencesStore.getState().setToken(params.clan_token);
        return redirect('/dashboard');
    } else {
        return redirect('../../');
    }
};

const dashboardLoader = async () => {
    if (usePreferencesStore.getState().token) {
        return null;
    } else {
        return redirect('../../');
    }
};

const landingLoader = async () => {
    if (usePreferencesStore.getState().token) {
        return redirect('dashboard');
    }

    return null;
};

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
            <Route errorElement={<ErrorPage />}>
                <Route index element={<GetStarted />} loader={landingLoader} />

                <Route path=":clan_token" element={<Dashboard />} loader={dashboardSlugLoader} />

                <Route path="dashboard" element={<Dashboard />} loader={dashboardLoader} />

                <Route path="overview" element={<Overview />} />

                <Route path="alchemy" element={<AlchemyCalculator />} />

                <Route path="*" element={<FourOhFour />} />
            </Route>
        </Route>
    )
);

// const minutes = 1;
// const seconds = 60;
// const milliseconds = 1000;

// Refetch the data every x minutes
// const intervalMs = minutes * seconds * milliseconds;

const queryClient = new QueryClient();
// { defaultOptions: { queries: { refetchInterval: intervalMs } } }

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
