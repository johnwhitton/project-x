import {convertValueToTokenDecimals, convertValueFromTokenDecimals} from './utils';
export class Token {

  constructor(tokenName, tokenAddress, balance = +0, decimals = +18){
    this.name = tokenName;
    this.address = tokenAddress;
    this.balance = balance;
    this.decimals = decimals;
  }
}
