class Transaction {
    constructor(type, amount) {
        this.type = type;
        this.amount = amount;
        this.date = new Date().toLocaleString("vi-VN");
    }
}
class Account {
    #balance = 0;
    #transactions = [];
    constructor(AccountNumber, ownerName, initialBalance = 0) {
        this.AccountNumber = AccountNumber;
        this.ownerName = ownerName;
        this.#balance = initialBalance;
    }

    getBalance() {
    return this.#balance;
    }

    deposit(amount) {
        if (amount <= 0) {
            console.log('amount must be greater than 0');
            return;
        }
        this.#balance += amount;
        this.#transactions.push(new Transaction('deposit', Math.abs(amount)));

        console.log('Deposit successful. New balance: ' + this.#balance);
    }

    withdraw(amount) {
        if (amount > this.#balance) {
            console.log('Insufficient funds. Current balance: ' + this.#balance);
            return;
        } 
        this.#balance -= amount;
        this.#transactions.push( new Transaction('withdraw', Math.abs(amount)));
        console.log('withdraw successful. New balance: ' + this.#balance);
    }
}