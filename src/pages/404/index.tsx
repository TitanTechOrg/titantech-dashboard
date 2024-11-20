import { PageContainer } from '@/components';
import { Button, Code } from '@nextui-org/react';
import { useLocation } from 'react-router-dom';

export default function FourOhFour() {
    const location = useLocation();

    const handleAppReload = () => {
        window.location.href = '/';
    };

    return (
        <PageContainer>
            <div id="error-page" className="container flex h-screen flex-col items-center justify-center space-y-2">
                Oops, couldn't find page <Code>{location.pathname}</Code>
                <div className="py-4">
                    <Button color="primary" onClick={handleAppReload}>
                        Click here to reload the app
                    </Button>
                </div>
            </div>
        </PageContainer>
    );
}
