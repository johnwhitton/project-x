import React from 'react';
import BaseContainer from './BaseContainer';
import BaseHeader from './BaseHeader';

const App = () => {
  const connected = true;
  return (
    <div className='cowri-root'>
      <BaseHeader connectionStatus={connected}/>
      <BaseContainer connectionStatus={connected}/>
    </div>
  );
}

export default App;
