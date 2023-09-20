import Dashboard from './pages/dashboard';
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { NextUIProvider } from '@nextui-org/react';
import NoTokenPage from './pages/landing/index.tsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const queryClient = new QueryClient();
    const routes: RouteObject[] = [
        {
            path: '/',
            element: <NoTokenPage />,
        },
        {
            path: '/:token',
            loader: async ({ params }) => params?.token ?? null,
            element: <Dashboard />,
            errorElement: <NoTokenPage />,
        },
    ];
    const router = createBrowserRouter(routes, { basename: import.meta.env.DEV ? '/' : '/titantech-dashboard/' });

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
