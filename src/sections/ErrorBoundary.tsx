import { Component, ErrorInfo, ReactNode } from "react";

export class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
	state = {
		hasError: false,
	};

	public static getDerivedStateFromError(_: Error) {
		return { hasError: true };
	}

	public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		// You can also log the error to an error reporting service
		console.error("Uncaught error:", error, errorInfo);
	}

	private resetError() {
		this.setState({ hasError: false });
	}

	render() {
		if (this.state.hasError) {
			return (
				<>
					<h2>Something went wrong.</h2>
					<button onClick={this.resetError} >
						Reset error
					</button>
				</>
			);
		}

		return this.props.children;
	}
}