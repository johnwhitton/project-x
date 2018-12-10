import {CowriShell} from '../CowriShell';
import {Token} from '../Token';
import {assert} from 'chai';

it ('Test the CowriShell constructor', async () => {
  let cowriShell = buildCowriShellA();
  let expectedTotal = 600;
  assert.equal(expectedTotal, cowriShell.getBalance());
});

it ('Test returning the addresses of the tokens in the CowriShell', async () => {
  let cowriShell = buildCowriShellA();
  let expectedAddresses = ['BAddress', 'AAddress', 'CAddress'];
  assert.deepEqual(expectedAddresses, cowriShell.getTokenAddresses());
});

it ('Test the functionality behind overlapping tokens', async () => {
  let cowriShellA = buildCowriShellA();
  let cowriShellB = buildCowriShellB();
  let expectedOverlap = buildExpectedShellOverlap();
  let actualOverlap = cowriShellA.getOverlappedCowriShell(cowriShellB);
  assert.deepEqual(expectedOverlap.getTokenAddresses(), actualOverlap.getTokenAddresses());
});

it ('Test getting the address to value map', async () => {
  let cowriShell = buildCowriShellA();
  let expectedMap = {
    "AAddress": 100,
    "BAddress": 200,
    "CAddress": 300
  }
  assert.deepEqual(expectedMap, cowriShell.getAddressToValueMap());
});

it ('Test getting the sorted token array', async () => {
  let cowriShell = buildCowriShellA();
  let tokenA = new Token('Stablecoin A', 'AAddress', 100);
  let tokenB = new Token('Stablecoin B', 'BAddress', 200);
  let tokenC = new Token('Stablecoin C', 'CAddress', 300);
  let expectedSortedTokenArray = [tokenA, tokenB, tokenC];
  assert.deepEqual(expectedSortedTokenArray, cowriShell.getSortedTokenArray());
});

let buildCowriShellA = () => {
  let tokenA = new Token('Stablecoin A', 'AAddress', 100);
  let tokenB = new Token('Stablecoin B', 'BAddress', 200);
  let tokenC = new Token('Stablecoin C', 'CAddress', 300);
  return new CowriShell([tokenB, tokenA, tokenC]);
}

let buildCowriShellB = () => {
  let tokenB = new Token('Stablecoin B', 'BAddress', 100);
  let tokenC = new Token('Stablecoin C', 'CAddress', 200);
  let tokenD = new Token('Stablecoin D', 'DAddress', 300);
  return new CowriShell([tokenB, tokenC, tokenD]);
}

let buildExpectedShellOverlap = () => {
  let tokenB = new Token('Stablecoin B', 'BAddress', 200);
  let tokenC = new Token('Stablecoin C', 'CAddress', 300);
  return new CowriShell([tokenB, tokenC]);
}

