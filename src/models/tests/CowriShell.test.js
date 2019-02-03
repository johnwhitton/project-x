import {assert} from 'chai';
import {CowriShell} from '../CowriShell';
import {Token} from '../Token';

it('Test the CowriShell constructor', () => {
  const cowriShell = buildCowriShellA();
  const expectedTotal = 600;
  assert.equal(expectedTotal, cowriShell.getBalance());
});

it('Test returning the addresses of the tokens in the CowriShell', () => {
  const cowriShell = buildCowriShellA();
  const expectedAddresses = ['BAddress', 'AAddress', 'CAddress'];
  assert.deepEqual(expectedAddresses, cowriShell.getTokenAddresses());
});

it('Test the functionality behind overlapping tokens', () => {
  const cowriShellA = buildCowriShellA();
  const cowriShellB = buildCowriShellB();
  const expectedOverlap = buildExpectedShellOverlap();
  const actualOverlap = cowriShellA.getOverlappedCowriShell(cowriShellB);
  assert.deepEqual(
    expectedOverlap.getTokenAddresses(),
    actualOverlap.getTokenAddresses(),
  );
});

it('Test getting the address to value map', () => {
  const cowriShell = buildCowriShellA();
  const expectedMap = {
    AAddress: 100,
    BAddress: 200,
    CAddress: 300,
  };
  assert.deepEqual(expectedMap, cowriShell.getAddressToValueMap());
});

it('Test getting the sorted token array', () => {
  const cowriShell = buildCowriShellA();
  const tokenA = new Token('Stablecoin A', 'AAddress', 100);
  const tokenB = new Token('Stablecoin B', 'BAddress', 200);
  const tokenC = new Token('Stablecoin C', 'CAddress', 300);
  const expectedSortedTokenArray = [tokenA, tokenB, tokenC];
  const actualSortedTokenArray = cowriShell.getSortedTokenArray();
  for (let i = 0; i < cowriShell.getSortedTokenArray(); i++) {
    assert.equal(
      actualSortedTokenArray[i].address,
      expectedSortedTokenArray[i].address,
    );
    assert.equal(
      actualSortedTokenArray[i].name,
      expectedSortedTokenArray[i].name,
    );
    assert.equal(
      actualSortedTokenArray[i].balance,
      expectedSortedTokenArray[i].balance,
    );
  }
});

let buildCowriShellA = () => {
  const tokenA = new Token('Stablecoin A', 'AAddress', 100);
  const tokenB = new Token('Stablecoin B', 'BAddress', 200);
  const tokenC = new Token('Stablecoin C', 'CAddress', 300);
  return new CowriShell([tokenB, tokenA, tokenC]);
};

let buildCowriShellB = () => {
  const tokenB = new Token('Stablecoin B', 'BAddress', 100);
  const tokenC = new Token('Stablecoin C', 'CAddress', 200);
  const tokenD = new Token('Stablecoin D', 'DAddress', 300);
  return new CowriShell([tokenB, tokenC, tokenD]);
};

let buildExpectedShellOverlap = () => {
  const tokenB = new Token('Stablecoin B', 'BAddress', 200);
  const tokenC = new Token('Stablecoin C', 'CAddress', 300);
  return new CowriShell([tokenB, tokenC]);
};
