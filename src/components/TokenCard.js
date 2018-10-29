import React, {Component} from 'react';

class TokenCard extends Component {
  state = {
    toggleRemove: false,
  }

  toggleRemoveClass = e => {
    this.setState(prevState => ({
      toggleRemove: !prevState.toggleRemove,
    }))
  }

  render() {
    const token = this.props.token;
    const className = this.state.toggleRemove ? 'token-card-remove' : 'token-card-remove-hidden';
    return (
      <div className='token-card-container' onClick={this.toggleRemoveClass}>
        <div className={className}><i className='fas fa-trash-alt'></i></div>
        <img className='token-image' src={token.source} alt={`${token.name} logo`}/>
        <span className='token-card-name'>{token.name}</span>
      </div>
    )
  }
}

export default TokenCard;