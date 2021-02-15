import React from 'react';

// import './morpho-legend.css';

const MorphoLegend: React.FC<{
  isInterneuron: boolean;
  hasApproximatedSoma: boolean;
}> = ({ isInterneuron, hasApproximatedSoma }) => {
  return (
    <div className="morpho-legend">
      <ul>
        <li className="soma">Soma {hasApproximatedSoma && '(Approximated)'}</li>
        <li className="axon">Axon</li>

        {// Interneurons don't have a distinction between Basal / Apical Dendrites
        isInterneuron ? (
          <li className="basal-dendrites">Dendrites</li>
        ) : (
          <>
            <li className="basal-dendrites">Basal Dendrites</li>
            <li className="apical-dendrites">Apical Dendrites</li>
          </>
        )}
      </ul>
    </div>
  );
};

export default MorphoLegend;
