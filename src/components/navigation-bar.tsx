import Logo from '@/assets/Logo.webp';
import { ThemeSwitcher } from '@/features/theme';
import { usePreferencesStore } from '@/stores/preferences.store';
import { Image, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from '@nextui-org/react';
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

// const menuItems = ['dashboard', 'overview', ['alchemy', 'player-export-editor']];
// const menuItems = ['dashboard', 'overview', 'alchemy', 'player-export-editor'];
// const protectedRoutes = ['dashboard', 'overview', 'players', 'player-export-editor'];
const menuItems = ['dashboard', 'overview', 'players'];
const protectedRoutes = ['dashboard', 'overview', 'players'];

export function NavigationBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const { checkAuth } = usePreferencesStore.getState();

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
                {menuItems.map((item) => {
                    // if (typeof item === 'string') {
                    const path = '/' + item;

                    return (
                        <NavbarItem
                            key={`menu-${item}`}
                            isActive={location.pathname === path}
                            className={protectedRoutes.includes(item) && checkAuth() ? '' : 'hidden'}
                        >
                            <NavLink to={path} className={location.pathname === path ? 'text-primary' : 'text-foreground'}>
                                <span className="capitalize">{item}</span>
                            </NavLink>
                        </NavbarItem>
                    );
                    // } else {
                    //     return (
                    //         <Dropdown key={`menu-dropdown`}>
                    //             <NavbarItem>
                    //                 <DropdownTrigger>
                    //                     <Button
                    //                         disableRipple
                    //                         className="bg-transparent p-0 text-medium data-[hover=true]:bg-transparent"
                    //                         endContent={<ChevronDownIcon />}
                    //                         radius="sm"
                    //                         variant="light"
                    //                     >
                    //                         Tools
                    //                     </Button>
                    //                 </DropdownTrigger>
                    //             </NavbarItem>
                    //             <DropdownMenu
                    //                 className="w-[340px]"
                    //                 itemClasses={{
                    //                     base: 'gap-4',
                    //                 }}
                    //             >
                    //                 {item.flatMap((dropdownItem) => {
                    //                     const pageName = dropdownItem.replace(/-/g, ' ');
                    //                     const dropdownPath = '/' + dropdownItem;
                    //                     return (
                    //                         <DropdownItem
                    //                             key={`menu-dropdown-${dropdownItem}`}
                    //                             href={dropdownPath}
                    //                             title={<span className="capitalize">{pageName}</span>}
                    //                             className={
                    //                                 location.pathname === dropdownPath ? 'bg-primary/20 text-primary group-hover:bg-primary/20' : ''
                    //                             }
                    //                         />
                    //                     );
                    //                 })}
                    //             </DropdownMenu>
                    //         </Dropdown>
                    //     );
                    // }
                })}
            </NavbarContent>

            <NavbarContent justify="end">
                <NavbarItem className="flex flex-row items-center justify-end gap-4">
                    <ThemeSwitcher />
                </NavbarItem>
            </NavbarContent>

            <NavbarMenu className="min-h-lvh pb-32">
                {menuItems
                    .flat()
                    .filter((route) => {
                        if (!checkAuth() && protectedRoutes.includes(route)) return '';
                        return route;
                    })
                    .map((item) => {
                        const pageName = item.replace(/-/g, ' ');
                        return (
                            <NavbarMenuItem key={`mobile-menu-${item}`} onClick={() => setIsMenuOpen(false)}>
                                <NavLink className={`/${item}` === location.pathname ? 'text-primary' : 'text-foreground'} to={`/${item}`}>
                                    <span className="capitalize">{pageName}</span>
                                </NavLink>
                            </NavbarMenuItem>
                        );
                    })}
            </NavbarMenu>
        </Navbar>
    );
}
