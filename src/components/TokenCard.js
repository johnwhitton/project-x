import React, {Component, Fragment} from 'react';

class TokenCard extends Component {
  state = {
    toggleRemove: false,
  };

  toggleRemoveClass = tokenName => {
    this.setState(
      prevState => ({
        toggleRemove: !prevState.toggleRemove,
      }),
      this.props.setTokensToBeRemoved(tokenName),
    );
  };

  render() {
    const token = this.props.token;
    const className = this.state.toggleRemove
      ? 'token-card-remove'
      : 'token-card-remove-hidden';
    const selectedShadow = this.state.toggleRemove ? 'shadow' : '';
    return (
      <Fragment>
        <div
          className={`token-card-container ${selectedShadow}`}
          onClick={this.toggleRemoveClass.bind(null, token.name)}
        >
          <img
            className='token-image'
            src={token.source}
            alt={`${token.name} logo`}
          />
          <span className='token-card-name'>{token.name}</span>
        </div>
        <div className='close-container'>
          <span className={className} />
        </div>
      </Fragment>
    );
  }
}

export default TokenCard;
