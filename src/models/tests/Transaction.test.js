import {Transaction} from '../Transaction';
import {CowriShell} from '../CowriShell';
import {CowriUser} from '../CowriUser';
import {Token} from '../Token';
import {assert} from 'chai';

let senderCowriUser;
let receiverCowriUser;

it ('Test that creating a transaction throws an error if the balance isn\'t enough to cover the tx', () => {
  initializeTestData();
  let constructorFunction =
  assert.throws(() => new Transaction(senderCowriUser, receiverCowriUser, 10000));
});

it ('Test isOverlapEnoughToCoverTX returns true if the overlap is enough to cover the balance', () => {
  initializeTestData();
  let transaction = new Transaction(senderCowriUser, receiverCowriUser, 599);
  assert.isTrue(transaction.isOverlapEnoughToCoverTX());
});

it ('Test isOverlapEnoughToCoverTX returns true if the overlapped balance is equal to the amount to send', () => {
  initializeTestData();
  let transaction = new Transaction(senderCowriUser, receiverCowriUser, 600);
  assert.isTrue(transaction.isOverlapEnoughToCoverTX());
});

it ('Test isOverlapEnoughToCoverTX returns false if the overlap is not enough to cover the balance', () => {
  initializeTestData();
  let transaction = new Transaction(senderCowriUser, receiverCowriUser, 601);
  assert.isFalse(transaction.isOverlapEnoughToCoverTX());
});

it ('Test that isTotalBalanceEnoughToCoverTx returns true if it is exactly enough to cover balance', () => {
  initializeTestData();
  let transaction = new Transaction(senderCowriUser, receiverCowriUser, 1000);
  assert.isTrue(transaction.isTotalBalanceEnoughToCoverTX());
});

it ('Test algorithm with integers: scenario 1 => [0,1,0,0,0,0,0]', () => {
  shellAlgorithmTestScenario(1, [0,1,0,0,0,0,0]);
});

it ('Test algorithm with integers: scenario 2 => [0,0,2,0,0,0,0]', () => {
  shellAlgorithmTestScenario(2, [0,0,2,0,0,0,0]);
});

it ('Test algorithm with integers: scenario 3 => [0,0,3,0,0,0,0]', () => {
  shellAlgorithmTestScenario(3, [0,0,3,0,0,0,0]);
});

it ('Test algorithm with integers: scenario 9 => [0,0,0,0,0,0,9]', () => {
  shellAlgorithmTestScenario(9, [0,0,0,0,0,0,9]);
});

it ('Test algorithm with integers: scenario 11 => [0,1,0,0,0,0,10]', () => {
  shellAlgorithmTestScenario(11, [0,1,0,0,0,0,10]);
});

it ('Test algorithm with integers: scenario 13 => [0,0,3,0,0,0,10]', () => {
  shellAlgorithmTestScenario(13, [0,0,3,0,0,0,10]);
});

it ('Test algorithm with integers: scenario 14 => [0,0,0,0,4,0,10]', () => {
  shellAlgorithmTestScenario(14, [0,0,0,0,4,0,10]);
});

it ('Test algorithm with integers: scenario 17 => [0,0,0,0,0,7,10]', () => {
  shellAlgorithmTestScenario(17, [0,0,0,0,0,7,10]);
});

it ('Test algorithm with integers: scenario 20 => [0,0,2,0,0,8,10]', () => {
  shellAlgorithmTestScenario(20, [0,0,2,0,0,8,10]);
});

it ('Test algorithm with integers: scenario 22 => [0,0,0,0,4,8,10]', () => {
  shellAlgorithmTestScenario(22, [0,0,0,0,4,8,10]);
});

it ('Test algorithm with integers: scenario 23 => [0,0,0,0,5,8,10]', () => {
  shellAlgorithmTestScenario(23, [0,0,0,0,5,8,10]);
});

it ('Test algorithm with integers: scenario 29 => [0,0,3,3,5,8,10]', () => {
  shellAlgorithmTestScenario(29, [0,0,3,3,5,8,10]);
});

it ('Test algorithm with integers: scenario 30 => [0,1,3,3,5,8,10]', () => {
  shellAlgorithmTestScenario(30, [0,1,3,3,5,8,10]);
});

it ('Test algorithm with decimals: scenario 1.1 => [0,1.1,0,0,0,0,0]', () => {
  shellAlgorithmDecimalTestScenario(1.1, [0,1.1,0,0,0,0,0]);
});

it ('Test algorithm with decimals: scenario 3.3 => [0,0,3.3,0,0,0,0]', () => {
  shellAlgorithmDecimalTestScenario(3.3, [0,0,3.3,0,0,0,0]);
});

it ('Test algorithm with decimals: scenario 10.8 => [0,0,0,0,0,0,10.8]', () => {
  shellAlgorithmDecimalTestScenario(10.8, [0,0,0,0,0,0,10.8]);
});

it ('Test algorithm with decimals: scenario 4.4 => [0,0,0,0,0,0,4.4]', () => {
  shellAlgorithmDecimalTestScenario(4.4, [0,0,0,0,4.4,0,0]);
});

it ('Test algorithm with decimals: scenario 12 => [0,0,1.2,0,0,0,10.8]', () => {
  shellAlgorithmDecimalTestScenario(12, [0,0,1.2,0,0,0,10.8]);
});

it ('Test that isVanilla has correct return value', () => {
  initializeTestData();
  let transaction = new Transaction(senderCowriUser, receiverCowriUser, 10);
  assert.isTrue(transaction.isVanilla());
});

it ('Test that isIsmael has correct return value', () => {
  initializeTestData();
  let transaction = new Transaction(senderCowriUser, receiverCowriUser, 601);
  assert.isTrue(transaction.isIsmael());
});

let shellAlgorithmTestScenario = (transactionAmount, expectedBalanceArray) => {
  let senderCowriShell = buildIntegerBalanceCowriShell();
  let senderCowriUser = new CowriUser('senderCowriUser', senderCowriShell);
  let receiverCowriShell = buildIntegerBalanceCowriShell();
  let receiverCowriUser = new CowriUser('receiverCowriUser', receiverCowriShell);
  let testProtocol = new Transaction(senderCowriUser, receiverCowriUser, transactionAmount);
  let expectedAddressMap = buildExpectedTransferResult(expectedBalanceArray);
  let actualBalanceCowriShell = testProtocol.getCowriShellThatCoversBalance();
  let actualAddressMap = actualBalanceCowriShell.getAddressToValueMap();
  assert.deepEqual(expectedAddressMap, actualAddressMap);
}

let shellAlgorithmDecimalTestScenario = (transactionAmount, expectedBalanceArray) => {
  let senderCowriShell = buildDecimalBalanceCowriShell();
  let senderCowriUser = new CowriUser('senderCowriUser', senderCowriShell);
  let receiverCowriShell = buildDecimalBalanceCowriShell();
  let receiverCowriUser = new CowriUser('receiverCowriUser', receiverCowriShell);
  let testProtocol = new Transaction(senderCowriUser, receiverCowriUser, transactionAmount);
  let expectedAddressMap = buildExpectedTransferResult(expectedBalanceArray);
  let actualBalanceCowriShell = testProtocol.getCowriShellThatCoversBalance();
  let actualAddressMap = actualBalanceCowriShell.getAddressToValueMap();
  assert.deepEqual(expectedAddressMap, actualAddressMap);
}

let initializeTestData = () => {
  senderCowriUser = buildSenderCowriUser();
  receiverCowriUser = buildReceiverCowriUser();
}

let buildSenderCowriUser = () => {
  let senderCowriShell = buildSenderCowriShell();
  return new CowriUser('senderCowriUser', senderCowriShell);
}

let buildSenderCowriShell = () => {
  let tokenA = new Token("TokenA", "123", 100);
  let tokenB = new Token("TokenB", "abc", 200);
  let tokenC = new Token("TokenC", "ik998df9", 300);
  let tokenD = new Token("TokenD", "98dfkj", 400);
  return new CowriShell([tokenA, tokenB, tokenC, tokenD]);
}

let buildReceiverCowriUser = () => {
  let receiverCowriShell = buildReceiverCowriShell();
  return new CowriUser('receiverCowriUser', receiverCowriShell);
}

let buildReceiverCowriShell = () => {
  let tokenA = new Token("TokenA", "123", 150);
  let tokenB = new Token("TokenB", "abc", 250);
  let tokenC = new Token("TokenC", "ik998df9", 350);
  let tokenE = new Token("TokenE", "kdfjkdjf", 450);
  return new CowriShell([tokenA, tokenB, tokenC, tokenE]);
}

let buildIntegerBalanceCowriShell = () => {
  let tokenA = new Token("TokenA", "tknA", 0);
  let tokenB = new Token("TokenB", "tknB", 1);
  let tokenC = new Token("TokenC", "tknC", 3);
  let tokenD = new Token("TokenD", "tknD", 3);
  let tokenE = new Token("TokenE", "tknE", 5);
  let tokenF = new Token("TokenF", "tknF", 8);
  let tokenG = new Token("TokenG", "tknG", 10);
  return new CowriShell([tokenA, tokenB, tokenC, tokenD, tokenE, tokenF, tokenG]);
}

let buildDecimalBalanceCowriShell = () => {
  let tokenA = new Token("TokenA", "tknA", 0);
  let tokenB = new Token("TokenB", "tknB", 1.1);
  let tokenC = new Token("TokenC", "tknC", 3.3);
  let tokenD = new Token("TokenD", "tknD", 3.3);
  let tokenE = new Token("TokenE", "tknE", 5.5);
  let tokenF = new Token("TokenF", "tknF", 8.8);
  let tokenG = new Token("TokenG", "tknG", 10.8);
  return new CowriShell([tokenA, tokenB, tokenC, tokenD, tokenE, tokenF, tokenG]);
}

let buildExpectedTransferResult = (expectedTransferValues) => {
  return {
    "tknA": expectedTransferValues[0],
    "tknB": expectedTransferValues[1],
    "tknC": expectedTransferValues[2],
    "tknD": expectedTransferValues[3],
    "tknE": expectedTransferValues[4],
    "tknF": expectedTransferValues[5],
    "tknG": expectedTransferValues[6]
  }
}
