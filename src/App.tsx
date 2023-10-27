import Dashboard from './pages/dashboard';
import { createHashRouter, RouteObject, RouterProvider } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { NextUIProvider } from '@nextui-org/react';
import NoTokenPage from './pages/landing/index.tsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Alchemy from './pages/alchemy/index.tsx';
import RaidLog from './pages/dashboard/raid-log/index.tsx';

function App() {
    const queryClient = new QueryClient();
    const routes: RouteObject[] = [
        {
            path: '/*',
            element: <NoTokenPage />,
        },
        {
            path: '/:token',
            loader: async ({ params }) => params?.token ?? null,
            element: <Dashboard />,
            errorElement: <NoTokenPage />,
        },
        // {
        //     path: '/:token/raid-attacks',
        //     loader: async ({ params }) => params?.token ?? null,
        //     element: <RaidLog />,
        //     errorElement: <NoTokenPage />,
        // },
        {
            path: '/alchemy',
            element: <Alchemy />,
            errorElement: <NoTokenPage />,
        },
    ];
    const router = createHashRouter(routes);

    return (
        <QueryClientProvider client={queryClient}>
            <NextUIProvider>
                <RouterProvider router={router} />
                <ReactQueryDevtools initialIsOpen={false} />
                <ToastContainer />
            </NextUIProvider>
        </QueryClientProvider>
    );
}

export default App;
