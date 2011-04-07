
var moneySource = {
	transferTo: function(amount, recipient){
		this.decreaseBalance(amount);
		recipient.transferFrom(amount);
	},
	destinationAccount: function() {
		return context.destinationAccount;
	}
};

var moneySink = {
	updateLog: function(message, time, amount){},
	transferFrom: function(amount){
		this.increaseBalance(amount);
		this.updateLog('Transfer in', '2001-01-01', amount);
	}
}

var transferMoneyContext = {
	execute: function(amount, sourceAccount, destinationAccount) {
		sourceAccount.addRole(moneySource);
		destinationAccount.addRole(moneySink);
		sourceAccount.transferTo(amount, destinationAccount);
	}
};

var savingsAccount = {
	balance: 1000,
	accountId: null,

	decreaseBalance: function(amount) {
		this.balance = this.balance - amount;
	},
	increaseBalance: function(amount) {
		this.balance = this.balance + amount;
	},
	updateLog: function(msg, date, amount) {
		console.log("Account: " + accountId + ", message: " + msg + ", date: " + date + ", amount: " + amount);
	},
	addRole: function(role) {
		for(name in role){
			if(role.hasOwnProperty(name) && typeof role[name] === 'function'){
				this[name] = role[name];
			}
		}
	}
};

var checkingAccount = Object.create(savingsAccount);
checkingAccount.balance = 0;

transferMoneyContext.execute(300, savingsAccount, checkingAccount);
transferMoneyContext.execute(100, checkingAccount, savingsAccount);
console.log("Savings: " + savingsAccount.balance + ", checking: " + checkingAccount.balance);
