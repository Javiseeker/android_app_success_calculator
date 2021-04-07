import React from 'react';

import './Layout.css';
import Header from '../Header/Header';
import Form from '../Form/Form';
import Result from '../Result/Result';
import Footer from '../Footer/Footer';

const Layout = () => {

  return (
    <React.Fragment>
      <div className="header-container">
        <Header />
      </div>
      <div className="body-container">
        <div className="form-container">
          <Form />
        </div>
        
        <div className="result-container">
          <Result />
        </div>
      </div>
      <div className="footer-container">
        <Footer />
      </div>

    </React.Fragment>
  );
};

export default Layout;