import {LiquidityPoolRateQuery} from './LiquidityPoolRateQuery';

export class LiquidityPoolRateQueryBatch {
  constructor(senderCowriShell, receiverCowriShell) {
    this.senderCowriShell = senderCowriShell;
    this.receiverCowriShell = receiverCowriShell;
    this.queries = [];
    this.addBatchToQueries(senderCowriShell, receiverCowriShell);
  }

  addBatchToQueries(senderCowriShell, receiverCowriShell) {
    if (!senderCowriShell || !receiverCowriShell) {
      return;
    }
    for (let i = 0; i < senderCowriShell.tokenArray.length; i++) {
      for (let j = 0; j < receiverCowriShell.tokenArray.length; j++) {
        this.queries.push(
          new LiquidityPoolRateQuery(
            receiverCowriShell.tokenArray[i],
            senderCowriShell.tokenArray[j],
          ),
        );
      }
    }
  }
}
