import React from 'react';


type UnitProps = {
  value?: {
    name?: string;
    unit?: string;
  }
}

const replacement = {
  MOhm: 'MΩ',
};

const Unit: React.FC<UnitProps> = ({ value }) => {
  const unit = value?.unit || '';
  if (value.name.startsWith('No. of')) {
    return null;
  }
  return (
    <>
      {(replacement[unit] || unit)}
    </>
  );
};


export default Unit;
