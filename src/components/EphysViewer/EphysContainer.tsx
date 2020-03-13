import * as React from 'react';
import { matches } from 'lodash';
import { Resource } from '@bbp/nexus-sdk';
import { useNexusContext } from '@bbp/react-nexus';

import { ProcessedTraceData, Trace } from './types';
import processTrace from './processTrace';
import { parseUrl } from '../../utils';

const SHAPE = {
  '@type': 'DataDownload',
  encodingFormat: 'application/json',
};

const EphysContainer: React.FC<{
  resource: Resource<any>;
  children: (data: {
    loading: boolean;
    error: Error | null;
    data: {
      processedTrace: ProcessedTraceData;
      iUnit: string;
      vUnit: string;
    } | null;
  }) => React.ReactNode;
}> = ({ resource, children }) => {
  const nexus = useNexusContext();
  const [{ loading, error, data }, setData] = React.useState<{
    loading: boolean;
    error: Error | null;
    data: {
      processedTrace: ProcessedTraceData;
      iUnit: string;
      vUnit: string;
    } | null;
  }>({
    loading: true,
    error: null,
    data: null,
  });

  React.useEffect(() => {
    if (!resource.distribution) {
      setData({
        loading: false,
        error: new Error(
          `No distribution found for resource ${resource['@id']}`,
        ),
        data: null,
      });
      return;
    }

    const distribution = Array.isArray(resource.distribution)
      ? resource.distribution
      : [resource.distribution];

    const traceDistro = distribution.find(matches(SHAPE));

    if (!traceDistro) {
      setData({
        loading: false,
        error: new Error(
          `No distribution found for resource ${resource['@id']} with shape ${SHAPE}`,
        ),
        data: null,
      });
      return;
    }

    setData({
      loading: true,
      error: null,
      data: null,
    });

    const { org: orgLabel, project: projectLabel } = parseUrl(resource._self);

    const [id] = traceDistro.contentUrl.split('/').reverse();

    nexus.File.get(orgLabel, projectLabel, id, { as: 'text' })
      .then(file => {
        const trace = JSON.parse(file as string) as Trace;
        setData({
          data: {
            processedTrace: processTrace(trace),
            iUnit: trace.i_unit,
            vUnit: trace.v_unit,
          },
          loading: false,
          error: null,
        });
      })
      .catch(error => {
        setData({
          error,
          data: null,
          loading: false,
        });
      });
  }, [resource['@id']]);

  return <>{children({ loading, error, data })}</>;
};

export default EphysContainer;
