export class CowriShell {

  constructor(tokenArray) {
    this.tokenArray = tokenArray;
  }

  getBalance = () => {
    return this.tokenArray.reduce((x, y) => x + y.balance, 0);
  }

  getOverlappedCowriShell = (otherCowriShell) => {
    let otherAddresses = otherCowriShell.getTokenAddresses();
    let addresses = this.getTokenAddresses();
    let overlappedAddresses = addresses.filter(x => otherAddresses.includes(x));
    let overlappedTokens = this.tokenArray.filter(x => overlappedAddresses.includes(x.address));
    let overlappedCowriShell = new CowriShell(overlappedTokens);
    return overlappedCowriShell;
  }

  getTokenAddresses = () => {
    let addresses = [];
    for(const token in this.tokenArray) {
      addresses.push(this.tokenArray[token].address);
    }
    return addresses;
  }

  getAddressToValueMap = () => {
    let addressToValueMap = {};
    let addresses = this.tokenArray.map(x => x.address);
    for(let i = 0; i < addresses.length; i++) {
      addressToValueMap[addresses[i]] = this.tokenArray.filter(x => x.address === addresses[i])
        .map(x => x.balance)[0];
    }
    return addressToValueMap;
  }

  getSortedTokenArray = () => {
    const sortedArray = JSON.parse(JSON.stringify(this.tokenArray));
    sortedArray.sort((a, b) => a.balance - b.balance);
    return sortedArray;
  }
}
