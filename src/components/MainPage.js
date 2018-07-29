import React, { Fragment } from 'react';
// Import component
import Navigator from './Navigator';
import Footer from './Footer';

const MainPage = ({ pageHeader, mainContent }) => (
  <Fragment>
    <Navigator />
    <div className="container" id="wrapper">
      {pageHeader && (
        <div className="page-header">
          <h1>{pageHeader}</h1>
        </div>
      )}
      {mainContent}
    </div>
    <Footer />
  </Fragment>
);

export default MainPage;
