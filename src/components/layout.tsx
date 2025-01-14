import { KoFiWidget } from '@/features/donations/kofi';
import { Outlet } from 'react-router-dom';
import { NavigationBar } from './navigation-bar';

export default function Layout() {
    return (
        <div className="flex min-h-screen flex-col">
            <NavigationBar />
            <main id="content" className="flex w-full flex-1 flex-col items-center justify-center">
                <div className="w-full max-w-screen-2xl flex-1 p-4">
                    <Outlet />
                </div>
            </main>
            <footer className="mt-auto p-4">
                <KoFiWidget />
            </footer>
        </div>
    );
}
