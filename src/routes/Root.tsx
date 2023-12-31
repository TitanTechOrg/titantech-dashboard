import { useState } from 'react';
import { Image, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from '@nextui-org/react';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

function getImageLogoUrl(name: string): string {
    return new URL(`../assets/${name}.webp`, import.meta.url).href;
}

const menuItems = ['dashboard', 'alchemy'];
const logoFileName = 'Logo';

export default function Root() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const isAuthenticated = localStorage.getItem('clan_token') && localStorage.getItem('clan_token')?.length === 36;

    return (
        <div className="w-full grid items-center">
            <Navbar onMenuOpenChange={setIsMenuOpen} isMenuOpen={isMenuOpen} isBlurred={true} isBordered={true} className="mb-8">
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

                <NavbarContent className="md:flex lg:flex hidden md:flex gap-4" justify="center">
                    <NavbarItem isActive={location.pathname === '/dashboard'} className={!isAuthenticated ? 'hidden' : ''}>
                        <NavLink to="/dashboard" className={location.pathname === '/dashboard' ? 'text-primary' : 'text-foreground'}>
                            Dashboard
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

                <NavbarMenu className="z-50 mt-6">
                    {menuItems
                        .filter((route) => {
                            if (!isAuthenticated && route === 'dashboard') return '';
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

            <Outlet />
        </div>
    );
}

const capitaliseFirstLetter = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);
