import {
  convertValueToTokenDecimals,
  convertValueFromTokenDecimals,
} from '../utils/utils';
import {encodeERC20AssetData} from '../utils/utils';
import CowriMath from '../utils/math/CowriMath';

export class Token {
  constructor(tokenName, tokenAddress, balanceInWei = 0, decimals = 18) {
    this.name = tokenName;
    this.address = tokenAddress;
    this.balance = balanceInWei;
    this.decimals = decimals;
  }

  toBaseUnitAmount = () => {
    return CowriMath.bigNumber(
      convertValueToTokenDecimals(this.balance, this.decimals),
    );
  };

  getEncodedTokenData = () => {
    return encodeERC20AssetData(this.address);
  };
}
