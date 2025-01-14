import { Outlet } from 'react-router-dom';
import { NavigationBar } from './navigation-bar';

export default function Layout() {
    return (
        <>
            <NavigationBar />
            <main id="content" className="flex w-full flex-1 flex-col items-center justify-center">
                <div className="w-full max-w-screen-2xl flex-1 p-4">
                    <Outlet />
                </div>
            </main>
        </>
    );
}
