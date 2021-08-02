'use strict';

// Data
const account1 = {
  owner: 'Hannah Eichelsdoerfer',
  transactions: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1996,
};

const account2 = {
  owner: 'Bill Gates',
  transactions: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 1111,
};

const account3 = {
  owner: 'Steve Jobbs',
  transactions: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 2222,
};

const account4 = {
  owner: 'Michelle Obama',
  transactions: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 3333,
};

const accounts = [account1, account2, account3, account4];

const createUsernames = (accs) => {
  accs.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map(name => name[0]) // implicit return
      .join("");
  });
};
createUsernames(accounts);

// Log-In Implementation
const loginBtn = document.querySelector("#login-button");
const loginUsernameElement = document.querySelector("#login-username");
const loginPINelement = document.querySelector("#login-pin");

let currentAccount;

const welcomeParagraph = document.querySelector("#welcome")
const bankingInterface = document.querySelector("main")
const loginCredentials = document.querySelector("#login");
const logoutBtn = document.querySelector("#logout-button");

const updateStatements = (acc) => {
  calcDisplayBalance(currentAccount);
  displayTransactions(currentAccount.transactions);
  calcDisplaySummary(currentAccount);
};

loginBtn.addEventListener("click", (event) => {
  event.preventDefault();
  currentAccount = accounts.find(acc => acc.username === loginUsernameElement.value);
  if (currentAccount?.pin === Number(loginPINelement.value)) {
    welcomeParagraph.textContent = `Welcome back, ${currentAccount.owner.split(" ")}`;
    bankingInterface.classList.remove("hidden");
    loginCredentials.classList.add("hidden");
    logoutBtn.classList.remove("hidden");
    updateStatements(currentAccount);
  } else {
    alert("Wrong Credentials!");
  }
});

const logoutOrClose = () => {
  logoutBtn.classList.add("hidden");
  loginCredentials.classList.remove("hidden");
  bankingInterface.classList.add("hidden");
  loginUsernameElement.value = loginPINelement.value = "";
};

logoutBtn.addEventListener("click", () => {
  logoutOrClose();
});


// Calculate and Display the Balance
const balanceElement = document.querySelector("#balance-value");

const calcDisplayBalance = (acc => {
  acc.balance = acc.transactions.reduce((acc, transaction) => acc + transaction, 0);
  balanceElement.textContent = `${acc.balance}€`;
});

// Summary Display
const inSummaryElement = document.querySelector("#summary_value_income");
const outSummaryElement = document.querySelector("#summary_value_outgoing");
const interestSummaryElement = document.querySelector("#summary_value_interest");

const calcDisplaySummary = (account) => {
  const income = account.transactions
    .filter(mov => mov > 0)
    .reduce((acc, cur) => acc + cur, 0);
  inSummaryElement.textContent = `${income}€`;
  
  const out = account.transactions
    .filter(mov => mov < 0)
    .reduce((acc, cur) => acc + cur, 0);
  outSummaryElement.textContent = `${Math.abs(out)}€`;
  // lets just assume that this bank pays out an interest each time that there is a deposit to the bank account 
  // (interest = 1.2% of the deposited amount) 
  const interest = account.transactions 
    .filter(mov => mov > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, cur) => acc + cur, 0);
  interestSummaryElement.textContent = `${Math.abs(interest)}€`;
};

// Displaying the Transactions in the DOM
const transactionsContainer = document.querySelector(".transactions");

const displayTransactions = function(transactions) {
  transactionsContainer.innerHTML = "";
  
  transactions.forEach((transaction, index) => {
    const transactionType = transaction > 0 ? "deposit" : "withdrawl"
    const transactionHTML = `
    <div class="transaction">
      <span class="transaction-type">${index + 1} ${transactionType}</span>
      <span class="transaction-date">3 days ago</span>
      <span class="transaction-value">${transaction}€</span>
    </div>
    `;
    transactionsContainer.insertAdjacentHTML('afterbegin', transactionHTML);
  });
};

// Transfer money to another account
const transferBtn = document.querySelector("#transfer-button");
const transferReceiverInput = document.querySelector("#transfer-name-input");
const transferAmountInput = document.querySelector("#transfer-amount-input");

transferBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const amount = Number(transferAmountInput.value);
  const receiver = accounts.find(acc => acc.username === transferReceiverInput.value);
  transferAmountInput.value = transferReceiverInput.value = "";
  if (receiver && amount > 0 && currentAccount.balance >= amount && receiver?.username !== currentAccount.username) {
    receiver.transactions.push(amount);
    currentAccount.transactions.push(-amount);
    updateStatements(currentAccount);
  } else {
    alert("Inputs not valid!")
  }
});

// Get a Loan
const getLoanBtn = document.querySelector("#loan-button");
const inputLoanAmount = document.querySelector("#loan-amount-input")

getLoanBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const amount = Number(inputLoanAmount.value)
  if (amount > 0 && currentAccount.transactions.some(transaction => transaction >= amount * 0.1)) {
    currentAccount.transactions.push(amount);
    updateStatements(currentAccount);
    inputLoanAmount.value = "";
  } else {
    alert("Sorry, Loan can't be granted...");
  }
});

// Close Account
const inputCloseUsername = document.querySelector("#close-user-input");
const inputClosePIN = document.querySelector("#close-pin-input");
const closeBtn = document.querySelector("#close-button");

closeBtn.addEventListener("click", (event) => {
  event.preventDefault();
  if (inputCloseUsername.value === currentAccount.username && Number(inputClosePIN.value) === currentAccount.pin) {
    const index = accounts.findIndex(acc => acc.username === currentAccount.username)
    accounts.splice(index, 1);
    logoutOrClose();
    inputCloseUsername.value = inputClosePIN.value = "";
  }
});

