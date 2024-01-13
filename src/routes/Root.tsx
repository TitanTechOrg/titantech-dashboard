import { useState } from 'react';
import { Image, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from '@nextui-org/react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { capitaliseFirstLetter } from '@/utils/string-formatter';
import { ThemeSwitcher } from '@/features/theme';

function getImageLogoUrl(name: string): string {
    return new URL(`../assets/${name}.webp`, import.meta.url).href;
}

const menuItems = ['dashboard', 'overview', 'alchemy'];
const protectedRoutes = ['dashboard', 'overview'];
const logoFileName = 'Logo';

export default function Root() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const isAuthenticated = !!localStorage.getItem('clan_token') && localStorage.getItem('clan_token')?.length === 36;

    return (
        <>
            <Navbar
                onMenuOpenChange={setIsMenuOpen}
                isMenuOpen={isMenuOpen}
                className="fixed"
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
                isBlurred={false}
            >
                <NavbarContent>
                    <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} className="md:hidden" />

                    <NavbarBrand>
                        <NavLink to="/" className="gap-2 min-w-fit flex flex-row items-center text-foreground">
                            <div className="h-10 w-10">
                                <Image src={getImageLogoUrl(logoFileName)} radius="sm" />
                            </div>
                            <p className="font-bold text-inherit">TitanTech</p>
                        </NavLink>
                    </NavbarBrand>
                </NavbarContent>

                <NavbarContent className="md:flex lg:flex hidden gap-4" justify="center">
                    <NavbarItem isActive={location.pathname === '/dashboard'} className={!isAuthenticated ? 'hidden' : ''}>
                        <NavLink to="/dashboard" className={location.pathname === '/dashboard' ? 'text-primary' : 'text-foreground'}>
                            Dashboard
                        </NavLink>
                    </NavbarItem>

                    <NavbarItem isActive={location.pathname === '/overview'} className={!isAuthenticated ? 'hidden' : ''}>
                        <NavLink to="/overview" className={location.pathname === '/overview' ? 'text-primary' : 'text-foreground'}>
                            Overview
                        </NavLink>
                    </NavbarItem>

                    <NavbarItem isActive={location.pathname === '/alchemy'}>
                        <NavLink to="/alchemy" className={location.pathname === '/alchemy' ? 'text-primary' : 'text-foreground'}>
                            Alchemy
                        </NavLink>
                    </NavbarItem>
                </NavbarContent>

                <NavbarContent justify="end">
                    <NavbarItem className="flex flex-row items-center justify-end gap-4">
                        <ThemeSwitcher />
                    </NavbarItem>
                </NavbarContent>

                <NavbarMenu className="min-h-lvh pb-32">
                    {menuItems
                        .filter((route) => {
                            if (!isAuthenticated && protectedRoutes.includes(route)) return '';
                            return route;
                        })
                        .map((item, index) => (
                            <NavbarMenuItem key={`${item}-${index}`} onClick={() => setIsMenuOpen(false)}>
                                <NavLink className={`/${item}` === location.pathname ? 'text-primary' : 'text-foreground'} to={`/${item}`}>
                                    {capitaliseFirstLetter(item)}
                                </NavLink>
                            </NavbarMenuItem>
                        ))}
                </NavbarMenu>
            </Navbar>

            <div className="p-4 mt-16">
                <Outlet />
            </div>
        </>
    );
}
