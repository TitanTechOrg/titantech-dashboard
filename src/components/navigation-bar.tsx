import Logo from '@/assets/Logo.webp';
import { ThemeSwitcher } from '@/features/theme';
import { routePaths } from '@/routes';
import { usePreferencesStore } from '@/stores/preferences.store';
import { Image, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from '@nextui-org/react';
import { useMemo, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { KoFiButton } from './kofi-button';

export function NavigationBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const { token, checkAuth } = usePreferencesStore((state) => ({
        token: state.token,
        checkAuth: state.checkAuth,
    }));

    const routes = useMemo(() => {
        const isAuthenticated = checkAuth();
        return routePaths.filter((route) => (isAuthenticated ? true : !route.protected));
    }, [token, checkAuth]);

    return (
        <Navbar
            onMenuOpenChange={setIsMenuOpen}
            isMenuOpen={isMenuOpen}
            disableAnimation={true}
            classNames={{
                item: [
                    'flex',
                    'relative',
                    'h-full',
                    'items-center',
                    "data-[active=true]:after:content-['']",
                    'data-[active=true]:after:absolute',
                    'data-[active=true]:after:bottom-0',
                    'data-[active=true]:after:left-0',
                    'data-[active=true]:after:right-0',
                    'data-[active=true]:after:h-[2px]',
                    'data-[active=true]:after:rounded-[2px]',
                    'data-[active=true]:after:bg-primary',
                ],
                wrapper: ['max-w-screen-2xl'],
            }}
            isBordered={true}
        >
            <NavbarContent>
                <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} className="md:hidden" />

                <NavbarBrand>
                    <NavLink to="/" className="flex min-w-fit flex-row items-center gap-2 text-foreground">
                        <div className="h-10 w-10">
                            <Image src={Logo} className="rounded" />
                        </div>
                        <p className="font-bold text-inherit">TitanTech</p>
                    </NavLink>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden gap-4 md:flex lg:flex" justify="center">
                {routes.map((route) => {
                    const path = '/' + route.path;

                    return (
                        <NavbarItem key={`menu-${route.path}`} isActive={location.pathname === path}>
                            <NavLink to={path} className={location.pathname === path ? 'text-primary' : 'text-foreground'}>
                                <span className="capitalize">{route.path}</span>
                            </NavLink>
                        </NavbarItem>
                    );
                })}
            </NavbarContent>

            <NavbarContent justify="end">
                <NavbarItem className="flex flex-row items-center justify-end gap-1">
                    <ThemeSwitcher />
                    <KoFiButton />
                </NavbarItem>
            </NavbarContent>

            <NavbarMenu className="min-h-lvh pb-32">
                {routes.map((route) => {
                    const pageName = route.path.replace(/-/g, ' ');
                    return (
                        <NavbarMenuItem key={`mobile-menu-${route.path}`} onClick={() => setIsMenuOpen(false)}>
                            <NavLink className={`/${route.path}` === location.pathname ? 'text-primary' : 'text-foreground'} to={`/${route.path}`}>
                                <span className="capitalize">{pageName}</span>
                            </NavLink>
                        </NavbarMenuItem>
                    );
                })}
            </NavbarMenu>
        </Navbar>
    );
}
