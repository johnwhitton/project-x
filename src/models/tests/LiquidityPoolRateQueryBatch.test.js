import {assert} from 'chai';
import {Token} from '../Token';
import {LiquidityPoolRateQueryBatch} from '../LiquidityPoolRateQueryBatch';
import {LiquidityPoolRateQuery} from '../LiquidityPoolRateQuery';
import {CowriShell} from '../CowriShell';

it('Test the constructor of the LiquidityPoolRateQueryBatchBatch when not passing shells', () => {
  const lpRateQueryBatch = new LiquidityPoolRateQueryBatch();
  assert.deepEqual([], lpRateQueryBatch.queries);
});

it('Test the constructor of the LiquidityPoolRateQueryBatch when passing shells ', () => {
  const senderCowriShell = buildSenderCowriShell();
  const receiverCowriShell = buildReceiverCowriShell();
  const lpRateQueryBatch = new LiquidityPoolRateQueryBatch(
    senderCowriShell,
    receiverCowriShell,
  );
  assert.equal(senderCowriShell, lpRateQueryBatch.senderCowriShell);
  assert.equal(receiverCowriShell, lpRateQueryBatch.receiverCowriShell);
  assert.deepEqual(buildExpectedQueryArray(), lpRateQueryBatch.queries);
});

it('Test adding LiquidityPoolRateQueries to the query array in LiquidityPoolRateQueryBatch', () => {
  const senderCowriShell = buildSenderCowriShell();
  const receiverCowriShell = buildReceiverCowriShell();
  const lpRateQueryBatch = new LiquidityPoolRateQueryBatch();
  lpRateQueryBatch.addBatchToQueries(senderCowriShell, receiverCowriShell);
  assert.deepEqual(buildExpectedQueryArray(), lpRateQueryBatch.queries);
});

let buildSenderCowriShell = () => {
  const tokenA = new Token('TokenA', '123', 100);
  const tokenB = new Token('TokenB', 'abc', 200);
  const tokenC = new Token('TokenC', 'ik998df9', 300);
  const tokenD = new Token('TokenD', '98dfkj', 400);
  return new CowriShell([tokenA, tokenB, tokenC, tokenD]);
};

let buildReceiverCowriShell = () => {
  const tokenE = new Token('TokenE', '123', 150);
  const tokenF = new Token('TokenF', 'abc', 250);
  const tokenG = new Token('TokenG', 'ik998df9', 350);
  const tokenH = new Token('TokenH', 'kdfjkdjf', 450);
  return new CowriShell([tokenE, tokenF, tokenG, tokenH]);
};

let buildExpectedQueryArray = () => {
  const tokenA = new Token('TokenA', '123', 100);
  const tokenB = new Token('TokenB', 'abc', 200);
  const tokenC = new Token('TokenC', 'ik998df9', 300);
  const tokenD = new Token('TokenD', '98dfkj', 400);
  const tokenE = new Token('TokenE', '123', 150);
  const tokenF = new Token('TokenF', 'abc', 250);
  const tokenG = new Token('TokenG', 'ik998df9', 350);
  const tokenH = new Token('TokenH', 'kdfjkdjf', 450);
  const expectedQueryArray = [];
  const senderTokenArray = [tokenA, tokenB, tokenC, tokenD];
  const receiverTokenArray = [tokenE, tokenF, tokenG, tokenH];
  for (let i = 0; i < senderTokenArray.length; i++) {
    for (let j = 0; j < receiverTokenArray.length; j++) {
      expectedQueryArray.push(
        new LiquidityPoolRateQuery(receiverTokenArray[i], senderTokenArray[j]),
      );
    }
  }
  return expectedQueryArray;
};
