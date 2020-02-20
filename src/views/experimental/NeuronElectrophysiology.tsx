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

const eTypes = [
  {
    id: 'http://uri.interlex.org/base/ilx_0738199',
    label: 'bAC',
  },
  {
    id: 'http://uri.interlex.org/base/ilx_0738206',
    label: 'bIR',
  },
  {
    id: 'http://uri.interlex.org/base/ilx_0738203',
    label: 'bNAC',
  },
  {
    id: 'http://uri.interlex.org/base/ilx_0738200',
    label: 'bSTUT',
  },
  {
    id: 'http://uri.interlex.org/base/ilx_0738197',
    label: 'cAC',
  },
  {
    id: 'http://uri.interlex.org/base/ilx_0738204',
    label: 'cIR',
  },
  {
    id: 'http://uri.interlex.org/base/ilx_0738201',
    label: 'cNAC',
  },
  {
    id: 'http://uri.interlex.org/base/ilx_0738198',
    label: 'cSTUT',
  },
  {
    id: 'http://uri.interlex.org/base/ilx_0738205',
    label: 'dNAC',
  },
  {
    id: 'http://uri.interlex.org/base/ilx_0738202',
    label: 'dSTUT',
  },
];

const instances = ['instance 1', 'instance 2'];

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

  useNexus(nexus =>
    nexus.View.elasticSearchQuery(
      sscx.org,
      sscx.project,
      sscx.expNeuronElectroViewId,
      {
        query: {
          term: {
            _deprecated: false,
          },
        },
      },
    ),
  );

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
