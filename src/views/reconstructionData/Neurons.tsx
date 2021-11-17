import React from 'react';
import Image from 'next/image';
import { Row, Col } from 'antd';

import Collapsible from '../../components/Collapsible';
import Title from '../../components/Title';
import { colorName, sectionTitle } from './config';
import { basePath } from '../../config';

import styles from './neurons.module.scss';


const RecNeuronsView = () => (
  <div className={styles.container}>
    <Title
      primaryColor={colorName}
      title="Neurons"
      subtitle={sectionTitle}
      hint="We labeled single neurons with biocytin to stain their axonal and dendritic morphologies to enable their 3D reconstruction and their objective classification into morphological types (m-types). In addition, we also characterized the electrical firing patterns of these neurons to different intensities of step currents injected in the soma to group their response into electrical types (e-types). We then mapped the e-types expressed in each m-type to account for the observed diversity of morpho-electrical subtypes (me-types)"
    />

    <div className={styles.data}>
      <Collapsible title="Morphology-type" className="mt-4 dark-collapsible">
        <div className="text-center">
          <p className={styles.title}>Neuron Morphology Generalization</p>
        </div>
        <div className={styles.divider} />


        <div className={`${styles.desktopOnly} mt-3`}>
          <div className={styles.infoContainerD}>
            <div className={styles.infoCellD}>
              <div className={styles.infoHeadD}>Cloning</div>
            </div>
            <div className={styles.infoCellD}>
              <div className={styles.infoHeadD}>Axon grafting</div>
            </div>
            <div className={styles.infoCellD}>
              <div className={styles.infoHeadD}>Substitution</div>
            </div>
          </div>

          <div className={styles.infoContainerD}>
          <div className={`${styles.infoCellD} ${styles.hBorder}`}>
              <div className={styles.infoContentD}>
                Due to lack of variety in neuron morphologies collected from extrapolated data, morphology reconstruction variants/clones are obtained by programmatically jittering branch angles and/or slightly modifying the length of segments.
              </div>
            </div>
            <div className={`${styles.infoCellD} ${styles.hBorder}`}>
              <div className={styles.infoContentD}>
                Reconstructions are mainly performed on dendrites, there are only a few axons. To address this challenge, axons from one m-type are combined to the soma and dendrites of cells with the same morphology, as we assume they are compatible. This in turn generates new complete m-type models, increasing the diversity of neuron reconstructions.
              </div>
            </div>
            <div className={`${styles.infoCellD} ${styles.hBorder}`}>
              <div className={styles.infoContentD}>
                Certain known m-types lack an extrapolated reconstruction morphology. In order to favour variability of cell types (as observed in vivo), the lacking m-type morphologies are substituted with other reconstructed models.
              </div>
            </div>
          </div>

          <div className={styles.infoContainerD}>
            <div className={`${styles.infoCellD} ${styles.hBorder}`}>
              <div className={styles.infoImgD}>
                <Image
                  width="200"
                  height="80"
                  src={`${basePath}/assets/images/reconstruction-data/neurons/morphology-generalization-1.svg`}
                  layout="responsive"
                  alt="Morphology generalization illustration 1"
                />
              </div>
            </div>

            <div className={`${styles.infoCellD} ${styles.hBorder}`}>
              <div className={styles.infoImgD}>
                <Image
                  width="200"
                  height="80"
                  src={`${basePath}/assets/images/reconstruction-data/neurons/morphology-generalization-2.svg`}
                  layout="responsive"
                  alt="Morphology generalization illustration 2"
                />
              </div>
            </div>

            <div className={`${styles.infoCellD} ${styles.hBorder}`}>
              <div className={styles.infoImgD}>
                <Image
                  width="200"
                  height="80"
                  src={`${basePath}/assets/images/reconstruction-data/neurons/morphology-generalization-3.svg`}
                  layout="responsive"
                  alt="Morphology generalization illustration 3"
                />
              </div>
            </div>
          </div>
        </div>


        <div className={styles.mobileOnly}>
          <Row gutter={[0,20]}>
            <Col span={24} className="mt-2">
              <div className={styles.infoM}>
                <div className={styles.infoHeadM}>
                  Cloning
                </div>
                <div className={styles.infoContentM}>
                  <span>
                    Due to lack of variety in neuron morphologies collected from extrapolated data, morphology reconstruction variants/clones are obtained by programmatically jittering branch angles and/or slightly modifying the length of segments.
                  </span>
                </div>
                <div className={styles.infoImgM}>
                  <Image
                    width="200"
                    height="80"
                    src={`${basePath}/assets/images/reconstruction-data/neurons/morphology-generalization-1.svg`}
                    layout="responsive"
                  />
                </div>
              </div>
            </Col>

            <Col span={24} className="mt-2">
              <div className={styles.infoM}>
                <div className={styles.infoHeadM}>
                  Axon grafting
                </div>
                <div className={styles.infoContentM}>
                  <span>
                    Reconstructions are mainly performed on dendrites, there are only a few axons. To address this challenge, axons from one m-type are combined to the soma and dendrites of cells with the same morphology, as we assume they are compatible. This in turn generates new complete m-type models, increasing the diversity of neuron reconstructions.
                  </span>
                </div>
                <div className={styles.infoImgM}>
                  <Image
                    width="200"
                    height="80"
                    src={`${basePath}/assets/images/reconstruction-data/neurons/morphology-generalization-2.svg`}
                    layout="responsive"
                  />
                </div>
              </div>
            </Col>

            <Col span={24} className="mt-2">
              <div className={styles.infoM}>
                <div className={styles.infoHeadM}>
                  Substitution
                </div>
                <div className={styles.infoContentM}>
                  <span>
                    Certain known m-types lack an extrapolated reconstruction morphology. In order to favour variability of cell types (as observed in vivo), the lacking m-type morphologies are substituted with other reconstructed models.
                  </span>
                </div>
                <div className={styles.infoImgM}>
                  <Image
                    width="200"
                    height="80"
                    src={`${basePath}/assets/images/reconstruction-data/neurons/morphology-generalization-3.svg`}
                    layout="responsive"
                  />
                </div>
              </div>
            </Col>
          </Row>
        </div>

      </Collapsible>

      <Collapsible title="Electrophysiology-type" className="mt-4 dark-collapsible">
        <div className="text-center">
          <p className={styles.title}>Neuron eletrophysiology generalization</p>
        </div>
        <div className={styles.divider} />


        <div className={`${styles.infoContainerD} mt-3`}>
          <div className={styles.infoCellD}>
            <div className={styles.infoHeadD}>Feature-based generalization</div>
          </div>
        </div>

        <div className={styles.infoContainerD}>
          <div className={`${styles.infoCellD} ${styles.hBorder}`}>
            <div className={styles.infoContentD}>
              Although we have a large data set of experimental cell recordings, it is not feasible to record from every single neuron present in a circuit. Therefore, we pool the cells together in electrical types, and build a limited amount of models for each type. The constraints for each model are based on distributions of electrical features for each electrical type.
            </div>
          </div>
        </div>

        <div className={styles.infoContainerD}>
          <div className={`${styles.infoCellD} ${styles.hBorder}`}>
            <div className={styles.infoImgD}>
              <Image
                width="300"
                height="110"
                src={`${basePath}/assets/images/reconstruction-data/neurons/ephys-generalization.svg`}
                alt="Neuron Electrophysiology generalization illustration"
                layout="responsive"
              />
            </div>
          </div>
        </div>


        <div className={`${styles.infoContainerD} mt-3`}>
          <div className={styles.infoCellD}>
            <div className={styles.infoHeadD}>Ion channel generalization</div>
          </div>
        </div>

        <div className={styles.infoContainerD}>
          <div className={`${styles.infoCellD} ${styles.hBorder}`}>
            <div className={styles.infoContentD}>
              Each neuron has a very diverse set of ion channels. There is no precise experimental data available showing which channels are present in each cell type, nor how the channels are distributed along the morphology. Therefore, we have selected channels based on literature, and let an optimization algorithm decide which channels are necessary for each firing type.
            </div>
          </div>
        </div>

        <div className={styles.infoContainerD}>
          <div className={`${styles.infoCellD} ${styles.hBorder}`}>
            <div className={styles.infoImgD}>
              <Image
                width="300"
                height="110"
                src={`${basePath}/assets/images/reconstruction-data/neurons/ion-channel-generalization.svg`}
                alt="Neuron Electrophysiology generalization illustration"
                layout="responsive"
              />
            </div>
          </div>
        </div>


        <div className={`${styles.infoContainerD} mt-3`}>
          <div className={styles.infoCellD}>
            <div className={styles.infoHeadD}>Threshold-based generalization</div>
          </div>
        </div>

        <div className={styles.infoContainerD}>
          <div className={`${styles.infoCellD} ${styles.hBorder}`}>
            <div className={styles.infoContentD}>
              Even for the same firing and morphology type of neuron there are still significant differences between cells, for example in the size of the neurons. Since we don’t record from all of these differently sized cells, we normalize our protocols based on the firing threshold of the cells (rheobase). This way our neuronal model will generalize to morphologies of different sizes.
            </div>
          </div>
        </div>

        <div className={styles.infoContainerD}>
          <div className={`${styles.infoCellD} ${styles.hBorder}`}>
            <div className={styles.infoImgD}>
              <Image
                width="300"
                height="110"
                src={`${basePath}/assets/images/reconstruction-data/neurons/threshold-based-generalization.svg`}
                alt="Neuron Electrophysiology generalization illustration"
                layout="responsive"
              />
            </div>
          </div>
        </div>
      </Collapsible>

      <Collapsible title="Morpho-electrophysiological-instance" className="mt-4 dark-collapsible">
        <div className="text-center">
          <p className={styles.title}>Neuron morpholo-electrophysiological generalization</p>
        </div>
        <div className={styles.divider} />


        <div className={`${styles.infoContainerD} mt-3`}>
          <div className={styles.infoCellD}>
            <div className={styles.infoHeadD}>ME-Model generalization</div>
          </div>
        </div>

        <div className={styles.infoContainerD}>
          <div className={`${styles.infoCellD} ${styles.hBorder}`}>
            <div className={styles.infoContentD}>
              Each of our models is built for one particular morphology. To make sure these models generalize to all morphologies in the circuit, we have a step called model management. During this step the protocols used for the parameter optimization are executed for each model using all the relevant morphologies. Each of these instances is scored based on how well they are still within range of the original experimental data. Morpho-electrical combinations that score badly are discarded and not used in the circuit.
            </div>
          </div>
        </div>

        <div className={styles.infoContainerD}>
          <div className={`${styles.infoCellD} ${styles.hBorder}`}>
            <div className={styles.infoImgD}>
              <Image
                width="300"
                height="110"
                src={`${basePath}/assets/images/reconstruction-data/neurons/me-model-generalization.svg`}
                alt="Neuron Electrophysiology generalization illustration"
                layout="responsive"
              />
            </div>
          </div>
        </div>
      </Collapsible>
    </div>
  </div>
);

export default RecNeuronsView;
