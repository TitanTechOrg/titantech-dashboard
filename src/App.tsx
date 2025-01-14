import { ErrorBoundary } from '@/pages';
import { router } from '@/routes';
import { NextUIProvider, Spinner } from '@nextui-org/react';
import { BoxAndWiskers, BoxPlotController } from '@sgratzl/chartjs-chart-boxplot';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Colors,
    Legend,
    LinearScale,
    LineElement,
    LogarithmicScale,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';
import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { usePreferencesStore } from './stores/preferences.store';

ChartJS.register(
    ArcElement,
    BarElement,
    BoxPlotController,
    BoxAndWiskers,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    LogarithmicScale,
    CategoryScale,
    Colors
);

const queryClient = new QueryClient();

export default function App() {
    const isHydrated = usePreferencesStore.persist.hasHydrated();

    if (!isHydrated) {
        return <div>Loading...</div>;
    }

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
