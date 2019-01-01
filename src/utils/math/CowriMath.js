import { BigNumber } from 'bignumber.js';
import { BigNumber as ZeroExBigNumber } from '0x.js';

export default class CowriMath {
  static plus = (num1, num2) => {
    const bigNum1 = new BigNumber(num1);
    return +bigNum1.plus(num2);
  };

  static minus = (num1, num2) => {
    const bigNum1 = new BigNumber(num1);
    return +bigNum1.minus(num2);
  };

  static dividedBy = (numerator, denominator) => {
    const bigNum1 = new BigNumber(numerator);
    return +bigNum1.dividedBy(denominator);
  };

  static times = (num1, num2) => {
    const bigNum1 = new BigNumber(num1);
    return +bigNum1.times(num2);
  };

  static pow = (base, exponent) => {
    const bigNum1 = new BigNumber(base);
    return +bigNum1.exponentiatedBy(exponent);
  }

  static bigNumber = (number) => {
    return new ZeroExBigNumber(number);
  }

}

export const ZERO = new BigNumber(0);
