import {
  convertValueToTokenDecimals,
  convertValueFromTokenDecimals,
} from '../utils/utils';
import {encodeERC20AssetData} from '../utils/AssetDataUtils';

export class Token {
  constructor(tokenName, tokenAddress, balance = 0, decimals = 18) {
    this.name = tokenName;
    this.address = tokenAddress;
    this.balance = balance;
    this.decimals = decimals;
  }

  getEncodedTokenData = () => {
    return encodeERC20AssetData(this.address);
  };
}
