import Dashboard from './pages/dashboard';
import { RouteObject, RouterProvider, redirect, createBrowserRouter } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import NoTokenPage from './pages/landing/index.tsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Alchemy from './pages/alchemy/index.tsx';
import { NextUIProvider } from '@nextui-org/react';

function App() {
    const queryClient = new QueryClient();
    const routes: RouteObject[] = [
        {
            path: '/',
            element: <NoTokenPage />,
            children: [
                {
                    path: ':clan_token',
                    loader: async ({ params }) => {
                        // console.log("path: '/:clan_token'", params);
                        if (!params?.clan_token) return null;
                        // console.log(params.clan_token);
                        localStorage.setItem('clan_token', params.clan_token);
                        return redirect('/dashboard');
                    },
                    element: <NoTokenPage />,
                    errorElement: <NoTokenPage />,
                },
            ],
        },
        {
            path: '/dashboard',
            element: <Dashboard />,
            errorElement: <NoTokenPage />,
        },
        {
            path: '/alchemy',
            element: <Alchemy />,
            errorElement: <NoTokenPage />,
        },
        {
            path: '*',
            loader: async () => {
                return redirect('/');
            },
            element: <NoTokenPage />,
        },
    ];
    const router = createBrowserRouter(routes);

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
