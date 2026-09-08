class Transaction {
  constructor(type, amount) {
    this.type = type;
    this.amount = amount;
    this.date = new Date().toLocaleString("en-US");
  }
}

class Account {
  #balance = 0;
  #transactions = [];

  constructor(accountNumber, ownerName, initialBalance = 0) {
    this.accountNumber = accountNumber;
    this.ownerName = ownerName;
    this.#balance = initialBalance;
  }

  getBalance() {
    return this.#balance;
  }

  _updateBalance(amount, type) {
    this.#balance += amount;
    this.#transactions.push(new Transaction(type, Math.abs(amount)));
  }

  deposit(amount) {
    if (amount <= 0) {
      console.log("Deposit amount must be greater than 0!");
      return;
    }
    this._updateBalance(amount, "Deposit");
    console.log(`[${this.ownerName}] Deposited $${amount}. Balance: $${this.#balance}`);
  }

  withdraw(amount) {
    if (amount > this.#balance) {
      console.log(`[${this.ownerName}] Withdrawal failed! Insufficient balance.`);
      return false;
    }
    this._updateBalance(-amount, "Withdrawal");
    console.log(`[${this.ownerName}] Withdrew $${amount}. Balance: $${this.#balance}`);
    return true;
  }

  getHistory() {
    console.log(`\n--- TRANSACTION HISTORY: ${this.ownerName} (${this.accountNumber}) ---`);
    this.#transactions.forEach(t => {
      console.log(`- [${t.date}] ${t.type}: $${t.amount}`);
    });
    console.log(`=> Current balance: $${this.#balance}\n`);
  }
}

class SavingsAccount extends Account {
  constructor(accountNumber, ownerName, initialBalance, interestRate) {
    super(accountNumber, ownerName, initialBalance);
    this.interestRate = interestRate;
  }

  addInterest() {
    const interest = this.getBalance() * this.interestRate;
    this.deposit(interest);
    console.log(`[${this.ownerName}] Received $${interest} monthly interest.`);
  }
}

class CheckingAccount extends Account {
  constructor(accountNumber, ownerName, initialBalance, overdraftLimit) {
    super(accountNumber, ownerName, initialBalance);
    this.overdraftLimit = overdraftLimit;
  }

  withdraw(amount) {
    const maxAllowed = this.getBalance() + this.overdraftLimit;
    if (amount > maxAllowed) {
      console.log(`[${this.ownerName}] Overdraft limit exceeded ($${this.overdraftLimit})!`);
      return false;
    }
    this._updateBalance(-amount, "Overdraft Withdrawal");
    console.log(`[${this.ownerName}] Withdrew $${amount} (Overdraft). Current balance: $${this.getBalance()}`);
    return true;
  }
}

class Bank {
  constructor(bankName) {
    this.bankName = bankName;
    this.accounts = [];
  }

  addAccount(account) {
    this.accounts.push(account);
  }

  findAccount(accNumber) {
    return this.accounts.find(acc => acc.accountNumber === accNumber);
  }

  transfer(fromAccNum, toAccNum, amount) {
    console.log(`\nTransferring $${amount} from ${fromAccNum} to ${toAccNum}...`);
    const fromAcc = this.findAccount(fromAccNum);
    const toAcc = this.findAccount(toAccNum);

    if (!fromAcc || !toAcc) {
      console.log("Error: Account not found!");
      return;
    }

    if (fromAcc.withdraw(amount)) {
      toAcc.deposit(amount);
      console.log("Transfer successful!");
    }
  }
}

const myBank = new Bank("Global Bank");

const aliceAcc = new SavingsAccount("SA001", "Alice", 1000, 0.05);
const bobAcc = new CheckingAccount("CA002", "Bob", 100, 500);

myBank.addAccount(aliceAcc);
myBank.addAccount(bobAcc);

bobAcc.withdraw(400);
aliceAcc.addInterest();
myBank.transfer("SA001", "CA002", 300);
aliceAcc.getHistory();