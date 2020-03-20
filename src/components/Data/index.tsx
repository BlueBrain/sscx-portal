import React from 'react';
import { useNexusContext } from '@bbp/react-nexus';
import { ElasticSearchViewQueryResponse } from '@bbp/nexus-sdk';
import Helmet from 'react-helmet';

import { sscx } from '../../config';
import ScrollTo from '../../components/ScrollTo';
import './style.less';

const classPrefix = 'data-results__';

type DataProps = {
  hasData: boolean;
  query: {};
  children: (
    data: ElasticSearchViewQueryResponse<any>['hits']['hits'],
  ) => React.ReactNode;
  id?: string;
};

const Data: React.FC<DataProps> = ({
  hasData,
  query,
  children,
  id = 'data',
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
            '@graph': state.data.map(d => d._source),
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

export default Data;
