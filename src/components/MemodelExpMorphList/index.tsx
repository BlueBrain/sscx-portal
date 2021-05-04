import React from 'react';
import Link from 'next/link';
import qs from 'querystring';


type MemodelExpMorphListProps = {
  morphologies: Record<string, string>[];
  className?: string;
}

const hrefBase = '/experimental-data/neuron-morphology';

const neuriteTypeLabel = {
  axon: 'axon',
  dendrite: 'dendrite',
  'axon+dendrite': 'axon and dendrite',
}

const MemodelExpMorphList: React.FC<MemodelExpMorphListProps> = ({ morphologies, className = '' }) => {
  const linkHref = (morphology) => {
    const query = qs.stringify({
      layer: morphology.layer,
      mtype: morphology.mtype,
      instance: morphology.morphology,
    });
    return `${hrefBase}?${query}`;
  };

  return (
    <div className={className}>
      {morphologies.map(morphology => (
        <div key={morphology.morphology}>
          Morphology reconstruction used for {neuriteTypeLabel[morphology.source_neurite_type]}: &nbsp;
          <Link href={linkHref(morphology)}>
            <a>{morphology.morphology}</a>
          </Link>
        </div>
      ))}
    </div>
  );
};


export default MemodelExpMorphList;
