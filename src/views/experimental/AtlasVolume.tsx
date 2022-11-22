import React, { useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Row, Col, Spin } from 'antd';

import DataContainer from '@/components/DataContainer';

import Filters from '@/layouts/Filters';
import Title from '@/components/Title';
import InfoBox from '@/components/InfoBox';
import { color } from './config';
import Collapsible from '@/components/Collapsible';
import StickyContainer from '@/components/StickyContainer';

// import ColumnTilingViewer from '@/components/ColumnTilingViewer';
// import VolumeViewer from '@/components/VolumeViewer';

import selectorStyle from '@/styles/selector.module.scss';

const TridiView = dynamic(() => import('./TridiView'), { ssr: false });


const AtlasVolumeView: React.FC = () => {
  const [volumeViewerReady, setVolumeViewerReady] = useState<boolean>(false);
  const [columnTilingViewerReady, setColumnTilingViewerReady] = useState<boolean>(false);

  return (
    <>
      <Filters primaryColor={color} hasData={true}>
        <Row
          className="w-100"
          gutter={[0, 20]}
        >
          <Col
            className="mb-2"
            xs={24}
            xl={8}
            xxl={12}
          >
            <StickyContainer>
              <Title
                primaryColor={color}
                title="Atlas volume"
                subtitle="Experimental Data"
              />
              <InfoBox>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in pharetra ante.
                  Suspendisse ultrices odio sit amet aliquet ullamcorper. Fusce lacus eros, vehicula non nibh et,
                  porttitor tincidunt est. Curabitur pulvinar ex at nibh eleifend placerat. Sed vitae sem orci.
                  Nulla interdum pulvinar enim, dapibus lobortis nunc elementum vel. Suspendisse non posuere velit,\
                  id tincidunt tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus.
                  Integer eget sapien eu arcu lobortis porttitor. Vivamus egestas sollicitudin ultricies.
                  Ut lacinia ante ut ullamcorper scelerisque. Sed augue urna, luctus sed turpis vitae,
                  tempus aliquam sem.
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
            <div style={{ border: '1px solid #ffc500', display: 'inline-block', marginLeft: '4rem' }}>
              <Image
                src="https://fakeimg.pl/640x480/050a30/ffc500/?retina=1&text=Illustration&font=bebas"
                width="640"
                height="480"
                unoptimized
                alt=""
              />
            </div>
            {/* <div className={selectorStyle.row}>
              <div className={selectorStyle.column}>
                <div className={selectorStyle.head}>1. Select a layer</div>
                <div className={selectorStyle.body} style={{ padding: '2rem 4rem' }}>
                  <LayerSelector
                    color={color}
                    value={currentLayer}
                    onSelect={setLayer}
                  />
                </div>
              </div>
              <div className={selectorStyle.column}>
                <div className={selectorStyle.head}>2. Select a reconstruction</div>
                <div className={selectorStyle.body}>
                  <div className={selectorStyle.topFrameComponent}>
                    <List
                      block
                      list={mtypes}
                      value={currentMtype}
                      title="m-type"
                      color={color}
                      onSelect={setMtype}
                    />
                  </div>
                  <div className={selectorStyle.bottomFrameComponent}>
                    <List
                      block
                      list={instances}
                      value={currentInstance}
                      title="Reconstructed morphology"
                      color={color}
                      onSelect={setInstance}
                    />
                  </div>
                </div>
              </div>
            </div> */}
          </Col>
        </Row>
      </Filters>

      {/* <QuickSelector
        color={color}
        entries={[
          {
            title: 'Layer',
            currentValue: quickSelection.layer,
            values: layers,
            onChange: setQsLayer,
          },
          {
            title: 'M-type',
            currentValue: quickSelection.mtype,
            values: qsMtypes,
            onChange: setQsMtype,
          },
          {
            title: 'Morphology',
            currentValue: quickSelection.instance,
            values: qsInstances,
            onChange: setQsInstance,
          },
        ]}
      /> */}

      <DataContainer
        visible={true}
        navItems={[
          { id: 'volumeSection', label: 'Volume' },
          { id: 'columnTilingSection', label: 'Column tiling' },
        ]}
      >
        <Collapsible
          id="volumeSection"
          className="mb-4"
          title={`Atlas volume`}
        >
          <p>
            Ut sapiente consectetur et reprehenderit culpa cum natus consequatur. Aut perferendis iste in facilis
            libero hic illum molestias sit doloremque laboriosam hic voluptatem delectus et omnis velit.
            Ut architecto accusamus non numquam suscipit ut voluptatem quasi ut suscipit accusantium.
            At nulla beatae non suscipit voluptatem aut nihil beatae est illum eos eaque voluptatibus eos
            ratione odio? Sed culpa molestiae aut repellendus asperiores vel molestiae iste qui exercitationem
            consequatur ut nihil quasi. Et eaque optio aut ducimus dolorem sit consectetur tempore! In pariatur
            iusto et reprehenderit facere est incidunt dolore id galisum expedita ea facere doloribus sed modi
            iste hic suscipit fugit. Hic ducimus accusamus At quisquam consectetur sit quod dolor ut rerum
            officiis ut illo et veritatis dolorum. Ea aliquam asperiores sed odio beatae ut quisquam
            doloremque quo doloremque quia eos maxime dolorem nam voluptatibus aspernatur et doloribus sunt.
          </p>

          <TridiView />

          {/* <Spin spinning={!volumeViewerReady}>
            <VolumeViewer onReady={() => setVolumeViewerReady(true)} />
          </Spin> */}
        </Collapsible>

        <Collapsible
          id="columnTilingSection"
          title="Column tiling"
        >
          <p>
            At odit natus cum expedita fuga rem incidunt rerum 33 accusantium commodi eos possimus veniam ea eaque
            consequatur aut minus quia. Sed quos amet et quisquam aliquid id eveniet nulla. 33 sapiente dolorum et
            voluptas quasi quo neque voluptatibus sit officia pariatur sed dolores aperiam aut quia rerum et magni
            Quis. Aut odio voluptates quo vero consequatur eum fuga doloribus aut omnis pariatur vel aspernatur
            odio et veritatis incidunt ea molestiae inventore. Quo voluptatibus vero eos molestiae error qui maiores
            molestiae quo dolorem facere ut dolorem harum est tempore officiis.
          </p>

          {/* <Spin spinning={!columnTilingViewerReady}>
            <ColumnTilingViewer onReady={() => setColumnTilingViewerReady(true)} />
          </Spin> */}
        </Collapsible>
      </DataContainer>
    </>
  );
};

export default AtlasVolumeView;
