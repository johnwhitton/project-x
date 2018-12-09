import {assetDataUtils} from '0x.js';

const encodeERC20AssetData = (erc20TokenAddress) => {
  return assetDataUtils.encodeERC20AssetData(erc20TokenAddress);
}

export {encodeERC20AssetData};

