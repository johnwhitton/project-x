import {CowriShell} from './CowriShell';
import CowriMath from '../utils/math/CowriMath';

export class Transaction {

  constructor(senderCowriUser, receiverCowriUser, amount){
    this.senderCowriShell = senderCowriUser.cowriShell;
    this.receiverCowriShell = receiverCowriUser.cowriShell;
    this.senderCowriUser = senderCowriUser;
    this.receiverCowriUser = receiverCowriUser;
    this.amount = amount;
  }

  isOverlapEnoughToCoverTX = () => {
    let overlappedCowriShell = this.senderCowriShell.getOverlappedCowriShell(this.receiverCowriShell);
    return overlappedCowriShell.getBalance() >= this.amount;
  }

  isTotalBalanceEnoughToCoverTX = () => {
    let senderBalance = this.senderCowriShell.getBalance();
    return senderBalance >= this.amount;
  }

  getCowriShellThatCoversBalance = () => {
    let overlappedCowriShell = this.senderCowriShell.getOverlappedCowriShell(this.receiverCowriShell);
    let overlappedTokens = overlappedCowriShell.getSortedTokenArray();
    var returnedBalances = JSON.parse(JSON.stringify(overlappedTokens));//To get a deep copy in memory
    for(let i = 0; i < returnedBalances.length; i++) {
      returnedBalances[i].balance = 0;
    }
    for(let k = 0; k < overlappedTokens.length; k++){
      if(overlappedTokens[k].balance >= this.amount){
        returnedBalances[k].balance = this.amount;
        return new CowriShell(returnedBalances);
      }
    }
    let sum = 0;
    for(let i = overlappedTokens.length - 1; i > 0; i-- ){
      returnedBalances[i].balance = overlappedTokens[i].balance;
      sum = CowriMath.plus(sum, returnedBalances[i].balance);
      if (sum === this.amount){
        return new CowriShell(returnedBalances);
      }
      for(var j = 0; j < i; j++){
        if(sum + overlappedTokens[j].balance >= this.amount){
          returnedBalances[j].balance = CowriMath.minus(this.amount, sum);
          return new CowriShell(returnedBalances);
        }
      }
    }
  }

}
