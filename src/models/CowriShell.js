export class CowriShell {
  constructor(tokenArray) {
    this.tokenArray = tokenArray;
  }

  getBalance = () => this.tokenArray.reduce((x, y) => x + y.balance, 0);

  getOverlappedCowriShell = otherCowriShell => {
    const otherAddresses = otherCowriShell.getTokenAddresses();
    const addresses = this.getTokenAddresses();
    const overlappedAddresses = addresses.filter(x =>
      otherAddresses.includes(x),
    );
    const overlappedTokens = this.tokenArray.filter(x =>
      overlappedAddresses.includes(x.address),
    );
    const overlappedCowriShell = new CowriShell(overlappedTokens);
    return overlappedCowriShell;
  };

  getTokenAddresses = () => {
    const addresses = [];
    for (const token in this.tokenArray) {
      addresses.push(this.tokenArray[token].address);
    }
    return addresses;
  };

  getAddressToValueMap = () => {
    const addressToValueMap = {};
    const addresses = this.tokenArray.map(x => x.address);
    for (let i = 0; i < addresses.length; i++) {
      addressToValueMap[addresses[i]] = this.tokenArray
        .filter(x => x.address === addresses[i])
        .map(x => x.balance)[0];
    }
    return addressToValueMap;
  };

  getSortedTokenArray = () => {
    const sortedArray = JSON.parse(JSON.stringify(this.tokenArray));
    sortedArray.sort((a, b) => a.balance - b.balance);
    return sortedArray;
  };
}
