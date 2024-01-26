import { Button } from '@nextui-org/react';
import { useRouteError } from 'react-router-dom';

export function ErrorPage() {
    const error = useRouteError();

    const getErrorMessage = (error: unknown): string => {
        let message: string;

        if (error instanceof Error) {
            message = error.message;
        } else if (error && typeof error === 'object' && 'message' in error) {
            message = String(error.message);
        } else if (error && typeof error === 'object' && 'statusText' in error) {
            message = String(error.statusText);
        } else if (typeof error === 'string') {
            message = error;
        } else {
            message = 'Something went wrong';
        }

        return message;
    };

    const handleAppReload = () => {
        window.location.href = '/';
    };

    return (
        <div id="error-page" className="container flex h-screen flex-col items-center justify-center space-y-2">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{getErrorMessage(error)}</i>
            </p>

            <div className="py-4">
                <Button color="primary" onClick={handleAppReload}>
                    Click here to reload the app
                </Button>
            </div>
        </div>
    );
}
