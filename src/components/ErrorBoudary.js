/* eslint react/prop-types: 0 */
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // TODO: log the error to an error reporting service
    /* eslint-disable no-console */
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <span>Loading...</span>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
