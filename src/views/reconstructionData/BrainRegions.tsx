import React from 'react';
import Image from 'next/image';

import Collapsible from '../../components/Collapsible';
import Title from '../../components/Title';
import { colorName, sectionTitle } from './config';
import { basePath } from '../../config';

import styles from './pathways.module.scss';


const BrainRegionsView = () => (
  <div className={styles.container}>
    <Title
      primaryColor={colorName}
      title="Brain Regions"
      subtitle={sectionTitle}
      hint={<>
        <p>
          Experimental data on the multi-scale organization of brain regions is sparse. Here,
          we extracted the maximal possible information from a sparse dataset on the cellular,
          synaptic and microcircuit organization of the rat SSCx to exploit interdependencies in the experimental data
          to build a dense tissue level model. We developed algorithmic procedures
          that extrapolate the available data to fill in knowledge gaps.
        </p>
      </>}
    />

    <div className={styles.data}>
      <Collapsible title="Brain Regions" className="mt-4 dark-collapsible">
        <div className={`${styles.infoContainerD} mt-3`}>
          <div className={styles.infoCellD}>
            <div className={styles.infoHeadD}>Brain region generalisation</div>
          </div>
        </div>

        <div className={styles.infoContainerD}>
          <div className={styles.infoCellD}>
            <div className={styles.infoContentD}>
              <p>
                The infographic depicts how sparse experimental data was extrapolated to yield a dense,
                multi-scale reconstruction of 8 sub-regions of the rat primary somatosensory cortex.
              </p>
              <p>
                We procured the following sparse experimental data from the hind limb representation
                of juvenile rat primary somatosensory cortex (S1 HL):
              </p>
              <ol>
                <li>Layer heights</li>
                <li>Neuron densities</li>
                <li>Synapse densities</li>
                <li>Morphological reconstructions</li>
                <li>Layer-wise proportions of morphological types (m-types)</li>
                <li>Electrophysiological recordings (e-types)</li>
                <li>Morpho-electrical proportions (me-types)</li>
                <li>M-type specific bouton densities</li>
                <li>No. of synapses/connection and patterns of their axo-dendritic innervation</li>
                <li>
                  synapse types (s-types) based on release probability, time constants for recovery
                  from depression/facilitation, quantal conductances, and reversal potentials recorded at 2 mM [Ca2+]o
                </li>
              </ol>
              <p>
                We then extrapolated these data to 7 other sub-regions of rat S1:
                S1FL, "Fore Limb", S1Sh, "Shoulder", S1Tr, "Trunk", S1J, “Jaw", S1ULp, "Upper lip", S1DZ, "Disgranular zone", S1DZO, "Oral disgranular zone" to yield a dense, multi-scale reconstruction of the entire S1.
              </p>

            </div>
          </div>
        </div>

        <div className={styles.infoContainerD}>
          <div className={styles.infoCellD}>
            <div className={styles.infoImgD} style={{ backgroundColor: 'white' }}>
              <Image
                width="1920"
                height="1985"
                src={`${basePath}/assets/images/reconstruction-data/brain-regions/brain-regions-generalization.png`}
                alt="Brain region generalization illustration"
                layout="responsive"
              />
            </div>
          </div>
        </div>
      </Collapsible>
    </div>
  </div>
);

export default BrainRegionsView;
