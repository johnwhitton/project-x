import { BigNumber } from 'bignumber.js';

export default class CowriMath {

  static plus = (num1, num2) => {
    let bigNum1 = new BigNumber(num1);
    return +bigNum1.plus(num2);
  }

  static minus = (num1, num2) => {
    let bigNum1 = new BigNumber(num1);
    return +bigNum1.minus(num2);
  }

  static dividedBy = (numerator, denominator) => {
    let bigNum1 = new BigNumber(numerator);
    return +bigNum1.dividedBy(denominator);
  }

  static times = (num1, num2) => {
    let bigNum1 = new BigNumber(num1);
    return +bigNum1.times(num2);
  }

  static pow = (base, exponent) => {
    let bigNum1 = new BigNumber(base);
    return +bigNum1.exponentiatedBy(exponent);
  }
}
