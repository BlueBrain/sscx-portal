import React from 'react';
import Brand from './Brand';
import Navigation from './Navigation';

const MainLayout: React.FC = ({ children }) => {
  return (
    <>
      <Navigation />
      {children}
    </>
  );
};

export default MainLayout;
