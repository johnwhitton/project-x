import React, {Component} from 'react';
import CowriRow from './CowriRow';
import TableRow from './TableRow';
import TableColumn from './TableColumn';

class Table extends Component {
  state = {
    showAdditionalTokens: false,
  };

  toggleTokenStatus = () => {
    this.setState(prevState => ({
      showAdditionalTokens: !prevState.showAdditionalTokens,
    }));
  };

  render() {
    const {columns, rows} = this.props;
    const {showAdditionalTokens} = this.state;
    const cowriRow = rows[0];
    const tokenRows = rows.slice(1, rows.length);
    // const cowriRow = {
    //   asset: 'Cowri', quantity: 31530.427222, symbol: 'wri', price: 1, total: 12051.91, address: '0x000'
    // };
    const tokenCount = Object.keys(tokenRows).length;
    const tokenNounForm = tokenCount > 1 ? 'tokens' : 'token';
    const tableFooterAction = showAdditionalTokens ? 'Hide' : 'Show';
    return (
      <div className='table-container'>
        <TableColumn data={columns} />
        <CowriRow data={cowriRow} key={cowriRow.address} />
        {showAdditionalTokens &&
          Object.keys(tokenRows).map(row => (
            // TODO: Add transition for opening additional tokens
            <TableRow data={tokenRows[row]} key={tokenRows[row].address} />
          ))}
        <div className='table-footer-message' onClick={this.toggleTokenStatus}>
          <i className='fas fa-coins footer-icon' />
          <span>{`${tableFooterAction} ${tokenCount} additional shell ${tokenNounForm}`}</span>
        </div>
      </div>
    );
  }
}

export default Table;
