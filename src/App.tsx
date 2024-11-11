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
    Legend,
    LinearScale,
    LogarithmicScale,
    PointElement,
    Title,
    Tooltip,
    registerables,
} from 'chart.js';
import { MatrixController, MatrixElement } from 'chartjs-chart-matrix';
import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';

ChartJS.register(
    ArcElement,
    BarElement,
    BoxPlotController,
    BoxAndWiskers,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
    LogarithmicScale,
    MatrixController,
    MatrixElement,
    ...registerables
);

const queryClient = new QueryClient();

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
