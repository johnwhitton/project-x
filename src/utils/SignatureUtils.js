import {signatureUtils} from '0x.js';

const ecSignHashAsync = async (providerEngine, orderHashHex, userAddress) => {
  const signature = await signatureUtils.ecSignHashAsync(providerEngine, orderHashHex, userAddress);
  return signature;
};

export {ecSignHashAsync};
