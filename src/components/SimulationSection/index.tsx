import React, { FC, ReactNode } from 'react';
import Button from '../Button';
import Collapsible from '../Collapsible';
import ImageViewer from '../ImageViewer';
import classes from './styles.module.scss';

type SimulationSectionProps = {}

const SimulationSection: FC<SimulationSectionProps> = () => {
  const columnsContent: ReactNode[] = [
    'Definition : explain that these are in silico experiments. Explanation of this exact simulation.',
    <ImageViewer
      key={1}
      border
      src="https://bbp.epfl.ch/nmc-portal/assets/documents/10184/1204661/11_maya_christmasTree.jpg"
    />,
    <>
      <h3 className="mt-0">Explore data</h3>
      <ul>
        <li><Button>Pair Recording App</Button></li>
        <li><Button>Visualize with Brayns</Button></li>
      </ul>
    </>,
  ];
  return (
    <Collapsible
      id="simulationSection"
      className="mt-4"
      color="red"
      title="Simulations"
    >
      <div className="row">
        {columnsContent.map((content, idx) => (
          <div className={`col-xs-12 col-sm-4 ${classes.simulationSectionColumn}`} key={idx}>
            {content}
          </div>
        ))}
      </div>
    </Collapsible>
  );
};
export default SimulationSection;
