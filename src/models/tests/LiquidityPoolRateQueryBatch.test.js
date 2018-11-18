import {Token} from '../Token';
import {LiquidityPoolRateQueryBatch} from '../LiquidityPoolRateQueryBatch';
import {LiquidityPoolRateQuery} from '../LiquidityPoolRateQuery';
import {CowriShell} from '../CowriShell';
import {assert} from 'chai';

it('Test the constructor of the LiquidityPoolRateQueryBatchBatch when not passing shells', () => {
  let lpRateQueryBatch = new LiquidityPoolRateQueryBatch();
  assert.deepEqual([], lpRateQueryBatch.queries);
});

it('Test the constructor of the LiquidityPoolRateQueryBatch when passing shells ', () => {
  let senderCowriShell = buildSenderCowriShell();
  let receiverCowriShell = buildReceiverCowriShell();
  let lpRateQueryBatch = new LiquidityPoolRateQueryBatch(senderCowriShell, receiverCowriShell);
  assert.equal(senderCowriShell, lpRateQueryBatch.senderCowriShell);
  assert.equal(receiverCowriShell, lpRateQueryBatch.receiverCowriShell);
  assert.deepEqual(buildExpectedQueryArray(), lpRateQueryBatch.queries);
});

it('Test adding LiquidityPoolRateQueries to the query array in LiquidityPoolRateQueryBatch', () => {
  let senderCowriShell = buildSenderCowriShell();
  let receiverCowriShell = buildReceiverCowriShell();
  let lpRateQueryBatch = new LiquidityPoolRateQueryBatch();
  lpRateQueryBatch.addBatchToQueries(senderCowriShell, receiverCowriShell);
  assert.deepEqual(buildExpectedQueryArray(), lpRateQueryBatch.queries);
});

let buildSenderCowriShell = () => {
  let tokenA = new Token("TokenA", "123", 100);
  let tokenB = new Token("TokenB", "abc", 200);
  let tokenC = new Token("TokenC", "ik998df9", 300);
  let tokenD = new Token("TokenD", "98dfkj", 400);
  return new CowriShell([tokenA, tokenB, tokenC, tokenD]);
}

let buildReceiverCowriShell = () => {
  let tokenE = new Token("TokenE", "123", 150);
  let tokenF = new Token("TokenF", "abc", 250);
  let tokenG = new Token("TokenG", "ik998df9", 350);
  let tokenH = new Token("TokenH", "kdfjkdjf", 450);
  return new CowriShell([tokenE, tokenF, tokenG, tokenH]);
}

let buildExpectedQueryArray = () => {
  let tokenA = new Token("TokenA", "123", 100);
  let tokenB = new Token("TokenB", "abc", 200);
  let tokenC = new Token("TokenC", "ik998df9", 300);
  let tokenD = new Token("TokenD", "98dfkj", 400);
  let tokenE = new Token("TokenE", "123", 150);
  let tokenF = new Token("TokenF", "abc", 250);
  let tokenG = new Token("TokenG", "ik998df9", 350);
  let tokenH = new Token("TokenH", "kdfjkdjf", 450);
  let expectedQueryArray = [];
  let senderTokenArray = [tokenA, tokenB, tokenC, tokenD];
  let receiverTokenArray = [tokenE, tokenF, tokenG, tokenH];
  for(let i = 0; i < senderTokenArray.length; i++) {
    for(let j = 0; j < receiverTokenArray.length; j++) {
      expectedQueryArray.push(new LiquidityPoolRateQuery(receiverTokenArray[i], senderTokenArray[j]))
    }
  }
  return expectedQueryArray;
}
