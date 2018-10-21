import React from 'react';
import logo from '../images/cowri-logo-light.png';

const BaseHeaderTitle = () => {
  return (
    <div className='header-title-container'>
      <img className='title-image' src={logo} alt='cowri logo'/>
      <span className='title-text title-main'>Cowri</span>
      <span className='title-text title-sub'>Shell</span>
      <div className='beta-container'>BETA</div>
    </div>
  )
};

export default BaseHeaderTitle;