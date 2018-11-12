import CowriMath from './CowriMath';
/**
 * Converts token value to proper decimal places
 * @param {string} value - the value of token
 * @param {number} decimals - the decimals of token
 * @returns {number}
 */
const convertValueToTokenDecimals = (value, decimals) => CowriMath.times(value, CowriMath.pow(10, decimals));

/**
 * Converts token value to proper decimal places
 * @param {string} value - the value of token
 * @param {number} decimals - the decimals of token
 * @returns {number}
 */
const convertValueFromTokenDecimals = (value, decimals) => CowriMath.dividedBy(value, CowriMath.pow(10, decimals));

/**
 * Gets ratio of token to cowri
 * @param {string} balance - the balance of token
 * @param {string} cowriBalance - the value of cowri
 * @param {string} cowriToSend - the amount of cowri to send
 * @returns {number}
 */
const getTokenToCowriRatio = (balance, cowriBalance, cowriToSend)  => (balance / cowriBalance) *  cowriToSend;

export { convertValueToTokenDecimals, convertValueFromTokenDecimals, getTokenToCowriRatio };
