import React from 'react';
import { useRouter } from 'next/router';
import { useNexusContext } from '@bbp/react-nexus';
import { Row, Col } from 'antd';

import ESData from '../../components/ESData';
import DataContainer from '../../components/DataContainer';
import ImageViewer from '../../components/ImageViewer';
import NexusPlugin from '../../components/NexusPlugin';
import { fullElectroPhysiologyDataQuery, etypeTracesDataQuery } from '../../queries/es';
import { expTracePopulationFactsheetPath, expTraceFactsheetPath } from '../../queries/http';
import Filters from '../../layouts/Filters';
import Title from '../../components/Title';
import InfoBox from '../../components/InfoBox';
import { color } from './config';
import List from '../../components/List';
import Collapsible from '../../components/Collapsible';
import ExpTraceTable from '../../components/ExpTraceTable';
import ExpTraceFactsheet from '../../components/ExpTraceFactsheet';
import ExpEphysDistribution from '../../components/ExpEphysDistribution';
import Metadata from '../../components/Metadata';
import eTypes from '../../__generated__/experimentalData.json';
import { defaultSelection } from '../../constants';

import selectorStyle from '../../styles/selector.module.scss';
import HttpData from '../../components/HttpData';


const NeuronElectrophysiology: React.FC = () => {
  const router = useRouter();
  const nexus = useNexusContext();
  const { query } = router;
  if (!query.layer && !query.mtype && !query.instance) {
    const defaultEphysFilters = defaultSelection.experimentalData.neuronElectrophysiology;
    query.etype = defaultEphysFilters.ETYPE;
    query.etype_instance = defaultEphysFilters.INSTANCE;
  }

  const setQuery = (query: any) => {
    router.push({ query, pathname: router.pathname }, undefined, { shallow: true });
  };

  const setEtype = (etype: string) => {
    setQuery({
      etype,
      etype_instance: currentInstance,
    });
  };
  const setInstance = (instance: string) => {
    setQuery({
      etype: currentEtype,
      etype_instance: instance,
    });
  };

  const currentEtype: string = query.etype as string;
  const currentInstance: string = query.etype_instance as string;
  const etypeData = eTypes.find(etype => etype.label === currentEtype);
  const instances = etypeData ? etypeData.experiments.map(e => e.label) : [];

  const getAndSortTraces = (esDocuments) => esDocuments
    .map(esDocument => esDocument._source)
    .sort((m1, m2) => ((m1.name > m2.name) ? 1 : -1));

  return (
    <>
      <Filters primaryColor={color} hasData={!!currentEtype && !!currentInstance}>
        <Row align="bottom" className="w-100" gutter={[0, 20]}>
          <Col
            xs={24}
            xl={8}
            xxl={12}
          >
            <Title
              primaryColor={color}
              title="Neuron Electrophysiology"
              subtitle="Experimental Data"
            />
            <InfoBox>
              <p>
                Electrical traces were recorded from neurons using whole-cell patch clamp experiments in brain slices.
                A standardized stimulus protocol, called the e-code, is injected in each cell.
                Our scientists then classify the cells based on their firing type in different
                electrical types (e-types).
              </p>
            </InfoBox>
          </Col>

          <Col
            className={`set-accent-color--${color}`}
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
                    src="/sscx-portal/assets/images/selectors/ephys-bg.png"
                    alt="Background with neuron morphology example"
                  />
                </div>
              </div>
              <div className={selectorStyle.column}>
                <div className={selectorStyle.head}>Select a cell type</div>
                <div className={selectorStyle.body}>
                  <div style={{
                    backgroundColor: 'rgb(49, 50, 84)',
                    padding: '1rem',
                    marginBottom: '1rem',
                  }}
                  >
                    <List
                      title="e-type"
                      block
                      color={color}
                      list={eTypes.map(etype => etype.label)}
                      value={currentEtype}
                      onSelect={setEtype}
                    />
                  </div>
                  <div style={{
                    backgroundColor: 'rgb(49, 50, 84)',
                    padding: '1rem 1rem 1rem 2rem',
                  }}
                  >
                    <List
                      title="Experiment instance"
                      block
                      color={color}
                      list={instances}
                      value={currentInstance}
                      onSelect={setInstance}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Filters>

      <DataContainer
        visible={!!currentEtype && !!currentInstance}
        navItems={[
          { id: 'instanceSection', label: 'Instance' },
          { id: 'etypeSection', label: 'E-type' },
        ]}
      >
        <Collapsible
          id="instanceSection"
          title={`Electrophysiological recordings instance ${currentInstance}`}
        >
          <p className="mb-3">
            This section shows the whole-cell patch clamp recording of the neuron. The stimulus represents
            the current trace that was injected into the cell using the current clamp method.
            The response shows the membrane voltage of the neuron.
          </p>
          <ESData query={fullElectroPhysiologyDataQuery(currentEtype, currentInstance)}>
            {esDocuments => (
              <>
                {!!esDocuments && (
                  <>
                    <Metadata nexusDocument={esDocuments[0]._source} />
                    <h3 className="mt-3">Patch clamp recording</h3>
                    <NexusPlugin
                      className="mt-2"
                      name="neuron-electrophysiology"
                      resource={esDocuments[0]._source}
                      nexusClient={nexus}
                    />
                  </>
                )}
              </>
            )}
          </ESData>

          <HttpData path={expTraceFactsheetPath(currentInstance)}>
            {factsheetData => (
              <div className="mt-4">
                <h3>Electrical features</h3>
                <ExpTraceFactsheet className="mt-2" data={factsheetData} />
              </div>
            )}
          </HttpData>
        </Collapsible>

        <Collapsible
          id="etypeSection"
          className="mt-4"
          title={`E-type ${currentEtype}`}
        >
          <p className="mb-3">
            The e-type of a neuron is determined by its firing behavior when injected with a step current in the soma.
            The pattern of electrical activity of neurons can be accommodating or non-accommodating (AC and NAC types),
            it can be very regular or show some stuttering or irregular firing (STUT or IR types).
            The reaction of the cell at the start of the stimulus is also important,
            there can be a delay at the beginning (‘d’ types) or a little burst (‘b’ types).
          </p>

          <h3>Factsheet</h3>
          <HttpData path={expTracePopulationFactsheetPath(currentEtype)}>
            {factsheetData => (
              <ExpTraceFactsheet data={factsheetData} />
            )}
          </HttpData>

          <h3 className="mt-3">Distribution</h3>
          <ExpEphysDistribution etype={currentEtype} />

          <h3 className="mt-3">Experimental instances</h3>

          <ESData query={etypeTracesDataQuery(currentEtype)}>
            {esDocuments => (
              <>
                {!!esDocuments && (
                  <ExpTraceTable etype={currentEtype} traces={getAndSortTraces(esDocuments)} />
                )}
              </>
            )}
          </ESData>
        </Collapsible>
      </DataContainer>
    </>
  );
};

export default NeuronElectrophysiology;
