import React from 'react';
import { Grid } from '@material-ui/core';

import uruit from '../../assets/uruitlogo.jfif';
import './Header.css';
const Header = () => {

  const openInNewTab = (url: string) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }
  return (
    <div className="container">
      <div className="left-element">
        <h1>Android App Success Calculator</h1>
      </div>
      <div className="right-element">
        <img src={uruit} className="App-logo" alt="" onClick={() => openInNewTab('https://uruit.com/')} />
      </div>

    </div>
  );
};

export default Header;