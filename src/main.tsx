import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { NextUIProvider } from '@nextui-org/react';

import App from './App.tsx';
import NoTokenPage from './pages/landing/index.tsx';

import './index.css';

import { Toaster } from '@/components/ui/toaster';

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const router = createBrowserRouter([
    {
        path: '/',
        element: <NoTokenPage />,
    },
    {
        path: '/:token',
        loader: async ({ params }) => params?.token ?? null,
        element: <App />,
        errorElement: <NoTokenPage />,
    },
]);
root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <NextUIProvider>
                <RouterProvider router={router} />
                <ReactQueryDevtools initialIsOpen={false} />
                <Toaster />
            </NextUIProvider>
        </QueryClientProvider>
    </React.StrictMode>
);
