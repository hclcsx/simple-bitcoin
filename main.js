const SHA256 = require('crypto-js/sha256');

class Transaction {
  constructor(fromAdrress, toAdrress, amount) {
    this.fromAdrress = fromAdrress;
    this.toAdrress = toAdrress;
    this.amount = amount;
  }
}

class Block {
  constructor(timestamp, transactions, previousHash = '') {
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nounce = 0;
  }

  calculateHash() {
    return SHA256(
      this.index
      + this.timestamp
      + this.previousHash
      + this.nounce
      + JSON.stringify(this.data)).toString();
  }

  mineBlock(difficulty) {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
      this.nounce++;
      this.hash = this.calculateHash();
    }

    console.log("blocker mined: " + this.hash);
  }
}


class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2;
    this.pendingTransactions = [];
    this.miningReward = 100;
  }

  createGenesisBlock() {
    return new Block('01/01/2018', "Genesis Block", "");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  minePendingTransactions(miningRewardAddreess) {
    let block = new Block(Date.now(), this.pendingTransactions);
    block.mineBlock(this.difficulty);

    console.log("Block successfully mined!");
    this.chain.push(block);

    this.pendingTransactions = [
      new Transaction(null, miningRewardAddreess, this.miningReward),
    ];

  }

  createTransaction(transaction) {
    this.pendingTransactions.push(transaction);
  }

  getBalanceOfAddrress(adrress) {
    let balance = 0
    for (const block of this.chain) {
      for (const trans of block.transactions) {
        if (trans.fromAdrress === adrress) {
          balance -= trans.amount;
        }

        if (trans.toAdrress === adrress) {
          balance += trans.amount;
        }
      }
    }

    return balance;
  }

  isChainValid() {
    for (let index = 0; index < this.chain.length; index++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }
}

let savjeeChain = new Blockchain();
savjeeChain.createTransaction(new Transaction('adrress1', 'adrress2', 100));
savjeeChain.createTransaction(new Transaction('adrress2', 'adrress1', 50));

console.log('\n Starting mining...');
savjeeChain.minePendingTransactions('adrress3');

console.log('\nbalance of adrress3: ', savjeeChain.getBalanceOfAddrress('adrress3'));

console.log('\n Starting mining again...');
savjeeChain.minePendingTransactions('adrress3');

console.log('\nbalance of adrress3: ', savjeeChain.getBalanceOfAddrress('adrress3'));
