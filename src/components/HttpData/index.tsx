
import React from 'react';
import Helmet from 'react-helmet';

import ScrollTo from '../../components/ScrollTo';
import './style.less';

const classPrefix = 'data-results__';

type HttpDataProps = {
  path: string;
  children: (
    data: any,
  ) => React.ReactNode;
  id?: string;
};

const HttpData: React.FC<HttpDataProps> = ({
  path,
  children,
  id = 'data',
}) => {
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
        .catch(error => setState({ ...state, error, data: null }))
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
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://bbp.neuroshapes.org',
            '@graph': state.data,
          })}
        </script>
      </Helmet>
      <div id={id} className={`${classPrefix}basis`}>
        <div className="center">{children(state.data)}</div>
        <div className="scroll-to">
          <ScrollTo anchor="filters" direction="up">
            Return to filters
          </ScrollTo>
        </div>
      </div>
    </>
  );
};

export default HttpData;
