import {orderHashUtils} from '0x.js';

const getOrderHashHex = (order) => {
  return orderHashUtils.getOrderHashHex(order);
}

export {getOrderHashHex};

