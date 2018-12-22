import {Token} from './Token';
import {ExpirationTimeInSeconds, ZeroExExchangeAddress} from './Constants';
import {ZERO} from '../utils/math/CowriMath';
import {
  convertValueToTokenDecimals,
  generateRandom256Salt,
  encodeERC20AssetData,
} from '../utils/utils';

export class TokenSwapOrder {
  constructor(senderToken, senderCowriUser, receiverToken, receiverCowriUser) {
    this._expirationTimeInSeconds = ExpirationTimeInSeconds;
    this.senderToken = senderToken;
    this.senderCowriUser = senderCowriUser;
    this.receiverToken = receiverToken;
    this.receiverCowriUser = receiverCowriUser;
  }

  generateOrder = () => ({
    exchangeAddress: ZeroExExchangeAddress,
    makerAddress: this.senderCowriUser.address,
    takerAddress: this.receiverCowriUser.address,
    senderAddress: '',
    feeRecipientAddress: '',
    expirationTimeSeconds: ExpirationTimeInSeconds,
    salt: generateRandom256Salt(),
    makerAssetAmount: convertValueToTokenDecimals(
      this.senderToken.balance,
      this.senderToken.decimals,
    ),
    takerAssetAmount: convertValueToTokenDecimals(
      this.receiverToken.balance,
      this.receiverToken.decimals,
    ),
    makerAssetData: encodeERC20AssetData(this.senderToken.address),
    takerAssetData: encodeERC20AssetData(this.receiverToken.address),
    makerFee: ZERO,
    takerFee: ZERO,
  });
}
