import React from 'react';

type State = {
  hasError: boolean;
};

export default class ErrorBoundary extends React.Component<any, State> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) return <div>Error!</div>;
    return this.props.children;
  }
}
