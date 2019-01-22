import {CowriShell} from './CowriShell';
import CowriMath from '../utils/math/CowriMath';

export class Transaction {
  constructor(senderCowriUser, receiverCowriUser, amount) {
    this.senderCowriShell = senderCowriUser.cowriShell;
    this.receiverCowriShell = receiverCowriUser.cowriShell;
    this.senderCowriUser = senderCowriUser;
    this.receiverCowriUser = receiverCowriUser;
    this.amount = amount;
    if (!this.isTotalBalanceEnoughToCoverTX()) {
      throw new Error(
        "Sender balance isn't enough to cover transaction amount",
      );
    }
  }

  isOverlapEnoughToCoverTX = () => {
    const overlappedCowriShell = this.senderCowriShell.getOverlappedCowriShell(
      this.receiverCowriShell,
    );
    return overlappedCowriShell.getBalance() >= this.amount;
  };

  isTotalBalanceEnoughToCoverTX = (epsilon = 0) => {
    const senderBalance = this.senderCowriShell.getBalance();
    return (
      CowriMath.times(senderBalance, CowriMath.minus(1, epsilon)) >= this.amount
    );
  };

  isVanilla = () => this.isOverlapEnoughToCoverTX();

  isIsmael = () => !this.isOverlapEnoughToCoverTX();

  getCowriShellThatCoversBalance = () => {
    const overlappedCowriShell = this.senderCowriShell.getOverlappedCowriShell(
      this.receiverCowriShell,
    );
    const overlappedTokens = overlappedCowriShell.getSortedTokenArray();
    const returnedBalances = JSON.parse(JSON.stringify(overlappedTokens)); // To get a deep copy in memory
    for (let i = 0; i < returnedBalances.length; i++) {
      returnedBalances[i].balance = 0;
    }
    for (let k = 0; k < overlappedTokens.length; k++) {
      if (overlappedTokens[k].balance >= this.amount) {
        returnedBalances[k].balance = this.amount;
        return new CowriShell(returnedBalances);
      }
    }
    let sum = 0;
    for (let i = overlappedTokens.length - 1; i > 0; i--) {
      returnedBalances[i].balance = overlappedTokens[i].balance;
      sum = CowriMath.plus(sum, returnedBalances[i].balance);
      if (sum === this.amount) {
        return new CowriShell(returnedBalances);
      }
      for (let j = 0; j < i; j++) {
        if (sum + overlappedTokens[j].balance >= this.amount) {
          returnedBalances[j].balance = CowriMath.minus(this.amount, sum);
          return new CowriShell(returnedBalances);
        }
      }
    }
  };

  // TODO: TEST THIS
  getCowriShellThatCoversBalanceIfThereIsNoOverlap = (
    epsilon = [0.01, 0.025, 0.05],
  ) => {
    epsilon = epsilon.filter(eps => this.isTotalBalanceEnoughToCoverTX(eps));
    if (epsilon.length === 0) {
      throw new Error('Every epsilon puts the cost over the balance');
    }

    const senderTokens = this.senderCowriShell.getSortedTokenArray();
    const rateQueryBatches = [];
    for (let eps = 0; eps > epsilon.length; eps++) {
      const returnedBalances = JSON.parse(JSON.stringify(senderTokens)); // To get a deep copy in memory
      for (let i = 0; i < returnedBalances.length; i++) {
        returnedBalances[i].balance = 0;
      }
      for (let k = 0; k < senderTokens.length; k++) {
        if (
          senderTokens[k].balance >=
          CowriMath.times(this.amount, CowriMath.plus(1, epsilon[eps]))
        ) {
          returnedBalances[k].balance = this.amount;
          rateQueryBatches.push(
            new LiquidityPoolRateQueryBatch(
              new CowriShell(returnedBalances),
              this.receiverCowriShell,
            ),
          );
        }
      }
    }

    let sum = 0;
    for (let i = senderTokens.length - 1; i > 0; i--) {
      returnedBalances[i].balance = CowriMath.times(
        senderTokens[i].balance,
        CowriMath.minus(1, epsilon[eps]),
      );
      sum = CowriMath.plus(sum, returnedBalances[i].balance);
      if (sum === this.amount) {
        rateQueryBatches.push(
          new LiquidityPoolRateQueryBatch(
            new CowriShell(returnedBalances),
            this.receiverCowriShell,
          ),
        );
        continue;
      }
      for (let j = 0; j < i; j++) {
        const remainder = this.amount - sum;
        if (
          senderTokens[j].balance >=
          CowriMath.times(remainder, CowriMath.plus(1, epsilon[eps]))
        ) {
          returnedBalances[j].balance = CowriMath.minus(remainder);
          rateQueryBatches.push(
            new LiquidityPoolRateQueryBatch(
              new CowriShell(returnedBalances),
              this.receiverCowriShell,
            ),
          );
          break;
        }
      }
    }
  };
}
