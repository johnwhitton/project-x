import React, {Fragment} from 'react';
import BaseContainer from './BaseContainer';
import BaseHeader from './BaseHeader';
import SendModal from '../modals/SendModal';
import ReceiveModal from '../modals/ReceiveModal';

const App = () => {
  const connected = true;
  const showSendModal = false;
  const showReceiveModal = false;
  return (
    <Fragment>
      <div className='cowri-root'>
        <BaseHeader connectionStatus={connected}/>
        <BaseContainer connectionStatus={connected}/>
      </div>
      { showSendModal && (<SendModal/>) }
      { showReceiveModal && (<ReceiveModal/>) }
    </Fragment>
  );
}

export default App;
