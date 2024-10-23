// import { AlchemyCalculator } from '@/features/alchemy/index.ts';
// import { PlayerExport } from '@/features/editor/index.ts';
import { ErrorBoundary, ErrorPage, FourOhFour, GetStarted } from '@/features/misc';
import Root from '@/routes/Root';
import { usePreferencesStore } from '@/stores/preferences.store.ts';
import { lazyImport } from '@/utils/lazy-import';
import { NextUIProvider, Spinner } from '@nextui-org/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Suspense } from 'react';
import { createBrowserRouter, createRoutesFromElements, redirect, Route, RouterProvider } from 'react-router-dom';

type DashbloardLoaderParams = {
    params: any;
};

// const { GetStarted } = lazyImport(() => import('@/features/misc'), 'GetStarted');
// const { AlchemyCalculator } = lazyImport(() => import('@/features/alchemy'), 'AlchemyCalculator');
// const { PlayerExport } = lazyImport(() => import('@/features/editor'), 'PlayerExport');
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

// const landingLoader = async () => {
//     if (usePreferencesStore.getState().token) {
//         return redirect('dashboard');
//     }

//     return null;
// };

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
            <Route errorElement={<ErrorPage />}>
                <Route index element={<GetStarted />} />

                <Route path=":clan_token" element={<Dashboard />} loader={dashboardSlugLoader} />

                <Route path="dashboard" element={<Dashboard />} loader={dashboardLoader} />

                <Route path="overview" element={<Overview />} />

                {/* <Route path="alchemy" element={<AlchemyCalculator />} />

                <Route path="player-export-editor" element={<PlayerExport />} /> */}

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
                    <Suspense fallback={<Spinner />}>
                        <RouterProvider router={router} />
                    </Suspense>
                </NextUIProvider>
            </QueryClientProvider>
        </ErrorBoundary>
    );
}
