import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useNexusContext } from '@bbp/react-nexus';
import { Row, Col, Button, Spin } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

import ESData from '../../components/ESData';
import HttpDownloadButton from '../../components/HttpDownloadButton';
import DataContainer from '../../components/DataContainer';
import NexusPlugin from '../../components/NexusPlugin';
import NexusFileDownloadButton from '../../components/NexusFileDownloadButton';
import { expTracePopulationFactsheetPath, expTraceFactsheetPath, fullElectroPhysiologyDataPath, etypeTracesDataQuery } from '../../queries/http';
import Filters from '../../layouts/Filters';
import Title from '../../components/Title';
import InfoBox from '../../components/InfoBox';
import QuickSelector from '../../components/QuickSelector';
import { color } from './config';
import List from '../../components/List';
import Collapsible from '../../components/Collapsible';
import ExpTraceTable from '../../components/ExpTraceTable';
import ExpTraceFactsheet from '../../components/ExpTraceFactsheet';
import ExpEphysDistribution from '../../components/ExpEphysDistribution';
import Metadata from '../../components/Metadata';
import StickyContainer from '../../components/StickyContainer';
import ephysData from '../../__generated__/experimentalData.json';
import { defaultSelection } from '../../constants';
import { nexus as nexusConfig, basePath } from '../../config';

import selectorStyle from '../../styles/selector.module.scss';
import HttpData from '../../components/HttpData';


const etypes = ephysData.map(etype => etype.label).sort();

const NeuronElectrophysiology: React.FC = () => {
  const router = useRouter();
  const nexus = useNexusContext();

  const { etype, etype_instance: instance } = router.query as Record<string, string>;

  const [quickSelection, setQuickSelection] = useState<Record<string, string>>({ etype, instance });

  const setQuery = (query: any) => {
    router.push({ query }, undefined, { shallow: true });
  };

  const setEtype = (etype: string) => {
    setQuery({
      etype,
      etype_instance: instance,
    });
  };
  const setQsEtype = (etype: string) => {
    setQuickSelection({ etype });
  };

  const setInstance = (instance: string) => {
    setQuery({
      etype,
      etype_instance: instance,
    });
  };
  const setQsInstance = (instance: string) => {
    const { etype } = quickSelection;

    setQuickSelection({ etype, instance });

    setQuery({ etype, etype_instance: instance });
  };

  useEffect(() => {
    if (!router.isReady) return;

    if (!router.query.etype) {
      const query = defaultSelection.experimentalData.neuronElectrophysiology;
      const { etype, etype_instance: instance } = query;
      setQuickSelection({ etype, instance });
      router.replace({ query }, undefined, { shallow: true });
    } else {
      setQuickSelection({ etype, instance });
    }
  }, [router.query]);

  const getInstances = etype => {
    const etypeData = ephysData.find(etypeEntry => etypeEntry.label === etype);

    return etypeData
      ? etypeData.experiments.map(e => e.label).sort()
      : [];
  };

  const instances = getInstances(etype);
  const qsInstances = getInstances(quickSelection.etype);

  const getEphysDistribution = (resource: any) => Array.isArray(resource.distribution)
    ? resource.distribution.find((d: any) => d.name.match(/\.nwb$/i))
    : resource.distribution;

  const getAndSortTraces = (esDocuments) => esDocuments
    .sort((m1, m2) => ((m1.name > m2.name) ? 1 : -1));

  return (
    <>
      <Filters primaryColor={color} hasData={!!etype && !!instance}>
        <Row className="w-100" gutter={[0, 20]}>
          <Col
            className="mb-2"
            xs={24}
            xl={8}
            xxl={12}
          >
            <StickyContainer>
              <Title
                primaryColor={color}
                title="Neuron Electrophysiology"
                subtitle="Experimental Data"
              />
              <InfoBox>
                <p>
                  The electrophysiological properties of neurons are characterized using whole-cell patch clamp
                  experiments in brain slices. A standardized battery of stimuli, called the e-code, is applied
                  to each neuron and their response is classified into different electrical types (e-types).
                </p>
              </InfoBox>
            </StickyContainer>
          </Col>

          <Col
            className={`set-accent-color--${color} mb-2`}
            xs={24}
            xl={16}
            xxl={12}
          >
            <div className={selectorStyle.row}>
              <div className={selectorStyle.column}>
                <div className={selectorStyle.head}>&nbsp;</div>
                <div className={selectorStyle.body} style={{ padding: '0 4rem' }}>
                  <img
                    style={{ width: '100%' }}
                    src={`${basePath}/assets/images/selectors/ephys-bg.png`}
                    alt="Background with neuron morphology example"
                  />
                </div>
              </div>
              <div className={selectorStyle.column}>
                <div className={selectorStyle.head}>Select a cell type</div>
                <div className={selectorStyle.body}>
                  <div className={selectorStyle.topFrameComponent}>
                    <List
                      title="e-type"
                      block
                      color={color}
                      list={etypes}
                      value={etype}
                      onSelect={setEtype}
                    />
                  </div>
                  <div className={selectorStyle.bottomFrameComponent}>
                    <List
                      title="Experiment instance"
                      block
                      color={color}
                      list={instances}
                      value={instance}
                      onSelect={setInstance}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Filters>

      <QuickSelector
        color={color}
        entries={[
          {
            title: 'E-type',
            currentValue: quickSelection.etype,
            values: etypes,
            onChange: setQsEtype,
          },
          {
            title: 'Instance',
            currentValue: quickSelection.instance,
            values: qsInstances,
            onChange: setQsInstance,
          },
        ]}
      />

      <DataContainer
        visible={!!etype && !!instance}
        navItems={[
          { id: 'instanceSection', label: 'Instance' },
          { id: 'etypeSection', label: 'E-type' },
        ]}
      >
        <Collapsible
          id="instanceSection"
          title={`Electrophysiological recordings instance ${instance}`}
        >
          <p className="mb-3">
            When a stimulus type is selected, this page shows the whole-cell patch
            clamp recording of the neuron. The stimulus represents the current trace
            that was injected into the cell using the current clamp method.
            The response shows the membrane voltage of the neuron.
          </p>
          <HttpData path={fullElectroPhysiologyDataPath(instance)}>
            {(ephysResource, loading) => (
              <Spin spinning={loading}>
                {!!ephysResource && (
                  <>
                    <Metadata nexusDocument={ephysResource} />
                    <h3 className="mt-3">Patch clamp recording</h3>
                    <div className="row start-xs end-sm mt-2 mb-2">
                      <div className="col-xs">
                        <Button
                          className="mr-1"
                          type="dashed"
                          icon={<QuestionCircleOutlined />}
                          href={`${basePath}/tutorials/nwb/`}
                          target="_blank"
                          rel="noopener noreferrer"
                          size="small"
                        >
                          How to read NWB files
                        </Button>
                        <NexusFileDownloadButton
                          filename={getEphysDistribution(ephysResource).name}
                          url={getEphysDistribution(ephysResource).contentUrl}
                          org={nexusConfig.org}
                          project={nexusConfig.project}
                          id="ephysDownloadBtn"
                        >
                          trace
                        </NexusFileDownloadButton>
                      </div>
                    </div>
                    <NexusPlugin
                      name="neuron-electrophysiology"
                      resource={ephysResource}
                      nexusClient={nexus}
                    />
                  </>
                )}
              </Spin>
            )}
          </HttpData>

          <HttpData path={expTraceFactsheetPath(instance)}>
            {(factsheetData, loading) => (
              <Spin spinning={loading}>
                {factsheetData && (
                  <div className="mt-4">
                    <h3>Electrical features used in single cell model optimization</h3>
                    <ExpTraceFactsheet className="mt-2" data={factsheetData} />
                    <div className="text-right mt-2">
                      <HttpDownloadButton
                        href={expTraceFactsheetPath(instance)}
                        download={`exp-trace-factsheet-${instance}.json`}
                      >
                        factsheet
                      </HttpDownloadButton>
                    </div>
                  </div>
                )}
              </Spin>
            )}
          </HttpData>
        </Collapsible>

        <Collapsible
          id="etypeSection"
          className="mt-4"
          title={`E-type ${etype}`}
        >
          <p className="mb-3">
            The e-type of a neuron is determined by its firing behavior when injected with a step
            current in the soma. The pattern of electrical activity of neurons can be accommodating
            or non-accommodating (AC and NAC types), it can be very regular or show some stuttering
            or irregular firing (STUT or IR types). The response of the cell at the start of the
            stimulus is also important, there can be a delay at the beginning ('d' types) or a
            burst of activity ('b' types).
          </p>

          <h3>Electrical features used in single cell model optimization</h3>
          <HttpData path={expTracePopulationFactsheetPath(etype)}>
            {(factsheetData, loading) => (
              <Spin spinning={loading}>
                {factsheetData && (
                  <>
                    <ExpTraceFactsheet data={factsheetData} />
                    <div className="text-right mt-2">
                      <HttpDownloadButton
                        href={expTracePopulationFactsheetPath(etype)}
                        download={`exp-trace-population-factsheet-${etype}.json`}
                      >
                        factsheet
                      </HttpDownloadButton>
                    </div>
                  </>
                )}
              </Spin>
            )}
          </HttpData>

          <h3 className="mt-3">Distribution</h3>
          <ExpEphysDistribution etype={etype} />

          <h3 className="mt-3">Experimental instances</h3>

          <HttpData path={etypeTracesDataQuery(etype)}>
            {(ephysResources, loading) => (
              <Spin spinning={loading}>
                {!!ephysResources && (
                  <ExpTraceTable
                    etype={etype}
                    traces={getAndSortTraces(ephysResources)}
                    currentTrace={instance}
                  />
                )}
              </Spin>
            )}
          </HttpData>
        </Collapsible>
      </DataContainer>
    </>
  );
};

export default NeuronElectrophysiology;
