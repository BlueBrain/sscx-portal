import React from 'react';
import { useNexusContext } from '@bbp/react-nexus';
import { ElasticSearchViewQueryResponse } from '@bbp/nexus-sdk';

import { sscx } from '../../config';


type ESDataProps = {
  hasData: boolean;
  query: {};
  children: (
    data: ElasticSearchViewQueryResponse<any>['hits']['hits'],
  ) => React.ReactNode;
  id?: string;
};

const ESData: React.FC<ESDataProps> = ({
  hasData,
  query,
  children,
}) => {
  const [state, setState] = React.useState<{
    data: ElasticSearchViewQueryResponse<any>['hits']['hits'];
    loading: boolean;
    error: any;
  }>({
    data: [],
    loading: false,
    error: null,
  });
  const nexus = useNexusContext();

  React.useEffect(() => {
    if (hasData) {
      setState({ ...state, loading: true });
      nexus.View.elasticSearchQuery(
        sscx.org,
        sscx.project,
        sscx.expNeuronElectroViewId,
        query,
      )
        .then(data =>
          setState({ ...state, loading: false, data: data.hits.hits }),
        )
        .catch(error => setState({ ...state, loading: false, error }));
    }
  }, [hasData, query]);

  if (!hasData) {
    return null;
  }

  if (state.error) {
    return <p>An error happened loading the data... Please try again later.</p>;
  }

  if (state.loading || !state.data) {
    return <p>loading...</p>;
  }

  return (
    <>
      {children(state.data)}
    </>
  );
};

export default ESData;
