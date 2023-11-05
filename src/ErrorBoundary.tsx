import { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by error boundary:', error, errorInfo);
  }

  handleThrowError = () => {
    throw new Error('Test error');
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div>
          <p>Something went wrong.</p>
          <button onClick={this.handleThrowError}>Throw Error</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
