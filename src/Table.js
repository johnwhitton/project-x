import React, {Component} from 'react';
import CowriRow from './CowriRow.js';
import TableRow from './TableRow.js';
import TableColumn from './TableColumn.js';

class Table extends Component {
  state = {
    showAdditionalTokens: false,
  }
  toggleTokenStatus = () =>{
    this.setState(prevState => ({
      showAdditionalTokens: !prevState.showAdditionalTokens
    }));
  }
  render() {
    const {columns, rows} = this.props;
    const {showAdditionalTokens} = this.state;
    const cowriRow = {
      asset: 'Cowri', quantity: 31530.427222, symbol: 'wri', price: 1, total: 12051.91, address: '0x000'
    };
    const tokenCount = Object.keys(rows).length;
    const toggleFooterText = showAdditionalTokens ? 'Hide' : 'Show';
    return (
      <div className='table-container'>
        <TableColumn data={columns}/>
        <CowriRow data={cowriRow} key={cowriRow.address}/>
        {this.state.showAdditionalTokens && Object.keys(rows).map(row => (
          // TODO: Add animation for opening additional tokens
          <TableRow data={rows[row]} key={rows[row].address}/>
        ))}
          <div 
            className='table-footer-message'
            onClick={this.toggleTokenStatus}>
              <i className="fas fa-coins footer-icon"></i>
              <span>{`${toggleFooterText} ${tokenCount} additional tokens`}</span>
          </div>
      </div>
    )
  }
}

export default Table;