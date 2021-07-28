import React from 'react';


type UnitProps = {
  value?: {
    name?: string;
    unit?: string;
  },
  addComma?: boolean;
}

const replacement = {
  MOhm: 'MΩ',
};

const Unit: React.FC<UnitProps> = ({ value, addComma }) => {
  const unit = value?.unit || '';
  if (value.name.startsWith('No. of')) {
    return null;
  }
  return (
    <>
      {addComma && ', '}
      {(replacement[unit] || unit)}
    </>
  );
};


export default Unit;
