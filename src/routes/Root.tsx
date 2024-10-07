import { NavigationBar } from '@/components/NavigationBar';
import { Outlet } from 'react-router-dom';

export default function Root() {
    return (
        <>
            <NavigationBar />
            <main id="content" className="flex w-full flex-col items-center justify-center">
                <div className="w-full max-w-screen-2xl flex-1 p-4">
                    <Outlet />
                </div>
            </main>
        </>
    );
}
