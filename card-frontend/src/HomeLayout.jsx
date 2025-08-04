import React from 'react';
import Navbar from './Component/Home/Navbar';

const HomeLayout = ({ children }) => (
  <>
    <Navbar />
    <div>{children}</div>
  </>
);

export default HomeLayout;