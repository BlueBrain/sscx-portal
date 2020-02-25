import React from 'react';
import { useNexusContext } from '@bbp/react-nexus';
import { sscx } from '../../config';
import ScrollTo from '../../components/ScrollTo';
import './style.less';

const classPrefix = 'data-results__';

type DataProps = {
  hasData: boolean;
  query: {};
  children: (data) => React.ReactNode;
  id?: string;
};

const Data: React.FC<DataProps> = ({
  hasData,
  query,
  children,
  id = 'data',
}) => {
  const [state, setState] = React.useState({
    data: null,
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
        .then(data => setState({ ...state, loading: false, data }))
        .catch(error => setState({ ...state, loading: false, error }));
    }
  }, [hasData, query]);

  if (state.loading) {
    return <p>'loading'</p>;
  }
  if (state.error) {
    return <p>error</p>;
  }

  return (
    <div id={id} className={`${classPrefix}basis`}>
      <div className="center">{children(state.data)}</div>
      <div className="scroll-to">
        <ScrollTo anchor="filters" direction="up">
          Return to filters
        </ScrollTo>
      </div>
    </div>
  );
};

export default Data;
