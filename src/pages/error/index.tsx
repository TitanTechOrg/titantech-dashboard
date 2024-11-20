import { PageContainer } from '@/components';
import { Button } from '@nextui-org/react';
import React, { Component, ErrorInfo } from 'react';

interface Props {
    children: React.ReactNode;
}

interface State {
    hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('ErrorBoundary caught an error: ', error, errorInfo);
        this.setState({ hasError: true });
    }

    render() {
        if (this.state.hasError) {
            return (
                <PageContainer>
                    <h1>Something went wrong.</h1>
                    <Button onClick={() => (window.location.href = '/')}>Click here to reload the app</Button>
                </PageContainer>
            );
        }

        return this.props.children;
    }
}
