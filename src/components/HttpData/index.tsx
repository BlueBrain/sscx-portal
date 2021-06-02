import React from 'react';
import { captureException } from '@sentry/nextjs';


type HttpDataProps = {
  path: string;
  label?: string;
  children: (
    data: any,
    loading: boolean,
    error: any,
  ) => React.ReactNode;
};

const HttpData: React.FC<HttpDataProps> = ({ path, children, label = '' }) => {
  const [state, setState] = React.useState<{
    data: any;
    loading: boolean;
    error: any;
  }>({
    data: null,
    loading: true,
    error: null,
  });

  React.useEffect(() => {
    if (!path) return;

    setState({ ...state, loading: true, data: null });
    fetch(path)
      .then(res => {
        if (res.ok) return res.json();

        const err = new Error(`Can't fetch ${path}`);
        captureException(err);
        return err;
      })
      .then(data => setState({ ...state, data, error: null, loading: false }))
      .catch(error => setState({ ...state, error, data: null, loading: false }));
  }, [path]);

  if (!path) {
    return null;
  }

  if (state.loading) {
    return <p>Loading {label}...</p>;
  }

  if (state.error) {
    return (
      <p>
        An error happened loading the {label || 'data'}. The incident has been reported to developers.
      </p>
    );
  }

  return (
    <>
      {children(state.data, state.loading, state.error)}
    </>
  );
};

export default HttpData;
