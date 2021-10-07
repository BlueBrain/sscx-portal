import React from 'react';
import Image from 'next/image';

import Collapsible from '../../components/Collapsible';
import Title from '../../components/Title';
import { colorName, sectionTitle } from './config';
import { basePath } from '../../config';

import styles from './pathways.module.scss';


const SynapticPathwaysView = () => (
  <div className={styles.container}>
    <Title
      primaryColor={colorName}
      title="Synaptic Pathways"
      subtitle={sectionTitle}
      hint={<>
        <p>
          A synaptic pathway encompasses the set of all possible connections between pairs of neurons of pre
          and postsynaptic  morphological types (m-types).
        </p>
      </>}
    />

    <div className={styles.data}>
      <Collapsible title="Synaptic Pathways" className="mt-4 dark-collapsible">
        <div className={`${styles.infoContainerD} mt-3`}>
          <div className={styles.infoCellD}>
            <div className={styles.infoHeadD}>Synaptic connectivity morphological generalisation</div>
          </div>
        </div>

        <div className={styles.infoContainerD}>
          <div className={styles.infoCellD}>
            <div className={styles.infoContentD}>
              We generate synaptic connectivity on an anatomically detailed level, i.e. we are modelling the exact
              locations of individual synapses along the axon of the presynaptic and on the dendritic tree
              of the postsynaptic neuron. Each individual synapse is equipped with its own set of physiological parameters.
              Parameterization of these models is done on a per-pathway basis, that means for pairs
              of a given combination of pre- and postsynaptic neuron type.
            </div>
          </div>
        </div>

        <div className={styles.infoContainerD}>
          <div className={styles.infoCellD}>
            <div className={styles.infoImgD}>
              <Image
                width="2772"
                height="1096"
                src={`${basePath}/assets/images/reconstruction-data/pathways/synaptic-pathways-generalization.png`}
                alt="Synaptic pathways generalization illustration"
                layout="responsive"
              />
            </div>
          </div>
        </div>
      </Collapsible>
    </div>
  </div>
);

export default SynapticPathwaysView;
