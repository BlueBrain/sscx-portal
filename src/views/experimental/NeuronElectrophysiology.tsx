import React from 'react';
import { useHistory } from 'react-router-dom';
import { useNexus } from '@bbp/react-nexus';

import { sscx } from '../../config';
import useQuery from '../../hooks/useQuery';
import Filters from '../../layouts/Filters';
import Title from '../../components/Title';
import InfoBox from '../../components/InfoBox';
import { lorem } from '../Styleguide';
import { colorName } from './config';
import List from '../../components/List';
import ComboSelector from '../../components/ComboSelector';
import Collapsible from '../../components/Collapsible';
import ScrollTo from '../../components/ScrollTo';
import eTypes from '../../__generated__/experimentalData.json';

const LayerAnatomy: React.FC = () => {
  const query = useQuery();
  const history = useHistory();

  const addParam = (key: string, value: string): void => {
    query.set(key, value);
    history.push(`?${query.toString()}`);
  };

  const setEtype = (etype: string) => {
    addParam('etype', etype);
  };
  const setInstance = (instance: string) => {
    addParam('etype_instance', instance);
  };

  const currentEtype: string = query.get('etype');
  const currentInstance: string = query.get('etype_instance');
  const etypeData = eTypes.find(etype => etype.label === currentEtype);
  const instances = etypeData ? etypeData.experiments.map(e => e.label) : [];

  useNexus(nexus =>
    nexus.View.elasticSearchQuery(
      sscx.org,
      sscx.project,
      sscx.expNeuronElectroViewId,
      {
        query: {
          nested: {
            path: 'annotation.hasBody',
            query: {
              bool: {
                must: [{ match: { 'annotation.hasBody.label': 'cSTUT' } }],
              },
            },
          },
        },
      },
    ),
  );

  const anotherQuery = {
    query: {
      bool: {
        must: [
          {
            nested: {
              path: 'annotation.hasBody',
              query: {
                bool: {
                  must: { match: { 'annotation.hasBody.label': 'bAC' } },
                },
              },
            },
          },
          {
            nested: {
              path: 'derivation.entity',
              query: {
                bool: {
                  must: {
                    match: { 'derivation.entity.name': 'C020502C-MT-C1' },
                  },
                },
              },
            },
          },
        ],
      },
    },
  };

  return (
    <>
      <Filters
        primaryColor={colorName}
        backgroundAlt
        hasData={!!currentEtype && !!currentInstance}
      >
        <div id="top" className="center-col">
          <Title
            primaryColor={colorName}
            title="Neuron Electrophysiology"
            subtitle="Experimental Data"
            hint="Select a layer of interest in the S1 of the rat brain."
          />
          {!!currentEtype && (
            <div role="information">
              <InfoBox title="Longer Text" text={lorem} color={colorName} />
            </div>
          )}
        </div>
        <div className="center-col">
          <ComboSelector
            selector={
              <img
                src={require('../../assets/images/electroIllustration.svg')}
                alt="EPFL logo"
              />
            }
            list1={
              <List
                title="e-type"
                list={eTypes.map(etype => etype.label)}
                color={colorName}
                onSelect={setEtype}
                defaultValue={currentEtype}
              />
            }
            list2={
              <List
                title="Experiment instance"
                list={instances}
                color={colorName}
                onSelect={setInstance}
                defaultValue={currentInstance}
              />
            }
            listsTitle="Select cell type"
            list2Open={!!currentEtype}
          />
        </div>
      </Filters>
      {!!currentEtype && !!currentInstance && (
        <>
          <div
            id="bottom"
            className="data-result__basis"
            style={{
              backgroundColor: '#E5E9F4',
              display: 'flex',
            }}
          >
            <div
              style={{
                backgroundColor: '#E5E9F4',
                margin: '60px auto 60px',
                maxWidth: 1080,
              }}
            >
              <Collapsible title="Murderous Bird on Lockdown">
                <>
                  <p>
                    Newsflash: the escaped cassowary has been safely apprehended
                    earlier this afternoon. He is facing the most severe
                    charges.
                  </p>
                </>
              </Collapsible>
              <br />
              <Collapsible title="Murderous Bird on Lockdown">
                <>
                  <p>
                    Newsflash: the escaped cassowary has been safely apprehended
                    earlier this afternoon. He is facing the most severe
                    charges.
                  </p>
                </>
              </Collapsible>
              <br />
              <Collapsible title="Murderous Bird on Lockdown">
                <>
                  <p>
                    Newsflash: the escaped cassowary has been safely apprehended
                    earlier this afternoon. He is facing the most severe
                    charges.
                  </p>
                </>
              </Collapsible>
              <br />
              <Collapsible title="Murderous Bird on Lockdown">
                <>
                  <p>
                    Newsflash: the escaped cassowary has been safely apprehended
                    earlier this afternoon. He is facing the most severe
                    charges.
                  </p>
                </>
              </Collapsible>
              <br />
              <Collapsible title="Murderous Bird on Lockdown">
                <>
                  <p>
                    Newsflash: the escaped cassowary has been safely apprehended
                    earlier this afternoon. He is facing the most severe
                    charges.
                  </p>
                </>
              </Collapsible>
              <br />
              <Collapsible title="Murderous Bird on Lockdown">
                <>
                  <p>
                    Newsflash: the escaped cassowary has been safely apprehended
                    earlier this afternoon. He is facing the most severe
                    charges.
                  </p>
                </>
              </Collapsible>
              <br />
              <Collapsible title="Murderous Bird on Lockdown">
                <>
                  <p>
                    Newsflash: the escaped cassowary has been safely apprehended
                    earlier this afternoon. He is facing the most severe
                    charges.
                  </p>
                </>
              </Collapsible>
              <br />
              <Collapsible title="Murderous Bird on Lockdown">
                <>
                  <p>
                    Newsflash: the escaped cassowary has been safely apprehended
                    earlier this afternoon. He is facing the most severe
                    charges.
                  </p>
                </>
              </Collapsible>
              <br />
              <Collapsible title="Murderous Bird on Lockdown">
                <>
                  <p>
                    Newsflash: the escaped cassowary has been safely apprehended
                    earlier this afternoon. He is facing the most severe
                    charges.
                  </p>
                </>
              </Collapsible>
              <br />
            </div>
          </div>
          <div className="scroll-to">
            <ScrollTo anchor="top" direction="up">
              Return to filters
            </ScrollTo>
          </div>
        </>
      )}
    </>
  );
};

export default LayerAnatomy;
