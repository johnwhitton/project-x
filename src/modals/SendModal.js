import React from 'react';
import ShellABI from '../ShellABI';
import {convertValueToTokenDecimals} from '../utils/utils';
import loader from '../images/loader.gif';
// import Transaction from '../models/Transaction';

class SendModal extends React.PureComponent {
  state = {
    recipientAddress: '0xB9Bee603BD1449ADeB9a9Babd73e9b19f4Df5D50',
    recipientAmount: 0,
    loading: false,
  };

  // sendTransaction = () => {
  //   const { recipientAddress } = this.state;
  //   const { account, web3 } = this.props;
  //   try {
  //     if (!web3.utils.isAddress(recipientAddress)) {
  //       throw new Error('Invalid address!');
  //     }
  //   } catch (error) {
  //     /**
  //      * Display errors to user
  //      * check for error being instance of InvalidAddress error
  //      * check for error beign instance of Transaction error
  //      */
  //     console.error(error);
  //   }
  // };

  /**
   * Submits transfer to address from state
   */
  sendTransaction = async () => {
    const {account, closeModal, web3} = this.props;
    const {recipientAddress, recipientAmount} = this.state;
    this.setState({loading: true});
    try {
      const token = await new web3.eth.Contract(
        ShellABI,
        '0xad31da2bfd3113394745954445359caacb54bfef',
      );
      const tokenContractDecimals = await token.methods.decimals().call();
      const recipientDecimalAmout = convertValueToTokenDecimals(
        recipientAmount,
        tokenContractDecimals,
      );
      await token.methods
        .transfer(recipientAddress, String(recipientDecimalAmout))
        .send({from: account})
        .then(async txObject => {
          console.log('tx success:', txObject);
          this.setState({loading: false});
          closeModal(false);
        })
        .catch(() => {
          closeModal(false);
          throw new Error('User denied transaction signature.');
        });
    } catch (error) {
      console.error(error);
    }
  };

  onReceipientAddressChange = event => {
    const target = event.target.value;
    this.setState(({recipientAddress}) => ({
      recipientAddress: target,
    }));
  };

  onReceipientAmountChange = event => {
    const target = event.target.value;
    this.setState(({recipientAmount}) => ({
      recipientAmount: target,
    }));
  };

  render() {
    const {loading} = this.state;
    const {closeModal} = this.props;
    return (
      <div className='modal-backdrop'>
        <div className='send-modal-container'>
          <div className='send-modal-form'>
            {/* TODO: support multiple screen resolutions */}
            {loading && (
              <div className='loading-overlay'>
                <img className='loading-spinner' src={loader} />
              </div>
            )}
            <div className='send-modal-form-container'>
              <div className='send-modal-input address-input'>
                <label htmlFor='wallet-address'>
                  <i className='fas fa-arrow-circle-up btn-icon' />
                  Send from Metamask Wallet
                </label>
                <input
                  type='text'
                  className='wallet-address'
                  placeholder='Cowri'
                  disabled
                />
              </div>
              <div className='send-modal-input recipient-input'>
                <label htmlFor='recipient-address'>Recipient Address</label>
                <input
                  className='recipient-address'
                  onChange={this.onReceipientAddressChange}
                  placeholder='0x...'
                  type='text'
                  value={this.state.recipientAddress}
                />
              </div>
              <div className='send-modal-input amount-input'>
                <label htmlFor='cowri-amount'>Amount</label>
                <input
                  className='cowri-amount'
                  onChange={this.onReceipientAmountChange}
                  placeholder='0.0'
                  type='text'
                />
              </div>
              <div className='send-button-group-container'>
                <button
                  className='btn btn-cancel no-margin'
                  value='submit'
                  onClick={() => closeModal(false)}>
                  Cancel
                </button>
                <span className='send-modal-fee'>Fee: $0.014</span>
                <button
                  className='btn btn-send no-margin'
                  onClick={() => this.sendTransaction()}
                  value='submit'>
                  <i className='fas fa-arrow-circle-up btn-icon' />
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SendModal;
