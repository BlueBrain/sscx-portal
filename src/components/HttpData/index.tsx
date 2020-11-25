import React from 'react';


type HttpDataProps = {
  path: string;
  children: (data: any) => React.ReactNode;
};

const HttpData: React.FC<HttpDataProps> = ({ path, children }) => {
  const [state, setState] = React.useState<{
    data: any;
    loading: boolean;
    error: any;
  }>({
    data: null,
    loading: false,
    error: null,
  });

  React.useEffect(() => {
    if (path) {
      setState({ ...state, loading: true });
      fetch(path)
        .then(res => res.json())
        .then(data => setState({ ...state, data, error: false }))
        .catch(error => setState({ ...state, error, data: null }));
    }
  }, [path]);

  if (!path) {
    return null;
  }

  if (state.loading) {
    return <p>loading...</p>;
  }
  if (state.error) {
    return <p>An error happened loading the data... Please try again later.</p>;
  }

  return (
    <>
      {children(state.data)}
    </>
  );
};

export default HttpData;
