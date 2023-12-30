import { RouteObject, RouterProvider, redirect, createBrowserRouter } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NextUIProvider } from '@nextui-org/react';
import { lazy, useState } from 'react';
import { Image, Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from '@nextui-org/react';
import ThemeSwitcher from '@/components/ThemeSwitcher';

function getImageLogoUrl(name: string): string {
    return new URL(`./assets/${name}.webp`, import.meta.url).href;
}

const menuItems = ['Dashboard', 'Alchemy'];
const logoFileName = 'Logo';

const NoTokenPage = lazy(() => import('./pages/landing/index.tsx'));
const Alchemy = lazy(() => import('./pages/alchemy/index.tsx'));
const Dashboard = lazy(() => import('./pages/dashboard'));

function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState('/');

    // const notify = () => toast.error('Uh oh! Something went wrong.', { position: toast.POSITION.BOTTOM_RIGHT });
    const queryClient = new QueryClient();
    const routes: RouteObject[] = [
        {
            path: '/',
            element: <NoTokenPage />,
            children: [
                {
                    path: ':clan_token',
                    loader: async ({ params }) => {
                        if (!params?.clan_token) return null;
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
                <div className="w-full grid items-center">
                    <Navbar onMenuOpenChange={setIsMenuOpen} isBlurred={true} isBordered={true} className="mb-8">
                        <NavbarContent>
                            <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} className="md:hidden" />

                            <NavbarBrand>
                                <Link href="/" className="gap-2 min-w-fit" color="foreground" onClick={() => setCurrentPage('/')}>
                                    <div className="h-10 w-10">
                                        <Image src={getImageLogoUrl(logoFileName)} radius="sm" />
                                    </div>
                                    <p className="font-bold text-inherit">TitanTech</p>
                                </Link>
                            </NavbarBrand>
                        </NavbarContent>
                        <NavbarContent className="md:flex gap-4" justify="center">
                            <NavbarItem
                                isActive={currentPage === '/dashboard'}
                                className={!localStorage.getItem('clan_token') || localStorage.getItem('clan_token')?.length !== 36 ? 'hidden' : ''}
                            >
                                <Link
                                    href="/dashboard"
                                    color={currentPage === '/dashboard' ? 'primary' : 'foreground'}
                                    onClick={() => setCurrentPage('/dashboard')}
                                >
                                    Dashboard
                                </Link>
                            </NavbarItem>

                            <NavbarItem isActive={currentPage === '/alchemy'}>
                                <Link
                                    href="/alchemy"
                                    color={currentPage === '/alchemy' ? 'primary' : 'foreground'}
                                    onClick={() => setCurrentPage('/alchemy')}
                                >
                                    Alchemy
                                </Link>
                            </NavbarItem>
                        </NavbarContent>

                        <NavbarContent justify="end">
                            <NavbarItem className="flex flex-row items-center justify-end gap-4">
                                <ThemeSwitcher />
                            </NavbarItem>
                        </NavbarContent>

                        <NavbarMenu className="z-50 mt-4">
                            {menuItems.map((item, index) => (
                                <NavbarMenuItem key={`${item}-${index}`}>
                                    <Link color={index === 0 ? 'primary' : 'foreground'} className="w-full" href={`/${item}`} size="lg">
                                        {item}
                                    </Link>
                                </NavbarMenuItem>
                            ))}
                        </NavbarMenu>
                    </Navbar>
                </div>
                <RouterProvider router={router} />
                <ReactQueryDevtools initialIsOpen={false} />
                <ToastContainer />
            </NextUIProvider>
        </QueryClientProvider>
    );
}

export default App;
