import React, {Fragment} from 'react';
import BaseContainer from './BaseContainer';
import BaseHeader from './BaseHeader';
import SendModal from '../modals/SendModal';

const App = () => {
  const connected = true;
  const showModal = true;
  return (
    <Fragment>
      <div className='cowri-root'>
        <BaseHeader connectionStatus={connected}/>
        <BaseContainer connectionStatus={connected}/>
      </div>
      { showModal && (<SendModal/>) }
    </Fragment>
  );
}

export default App;
