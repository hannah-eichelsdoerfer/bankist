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

// Computing Usernames
// accounts.forEach(account => {
//   account.username = account.owner
//     .toLowerCase()
//     .split(" ")
//     .map(name => name[0]) // implicit return
//     .join("");
// });
// console.log(accounts);

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

loginBtn.addEventListener("click", (event) => {
  event.preventDefault();
  currentAccount = accounts.find(acc => acc.username === loginUsernameElement.value);
  if (currentAccount?.pin === Number(loginPINelement.value)) {
    welcomeParagraph.textContent = `Welcome back, ${currentAccount.owner.split(" ")}`;
    bankingInterface.style.opacity = 100;
    loginCredentials.classList.add("hidden");
    logoutBtn.classList.remove("hidden");
    console.log(logoutBtn)
    calcDisplayBalance(currentAccount.transactions);
    displayTransactions(currentAccount.transactions);
    calcDisplaySummary(currentAccount);
  } else {
    alert("Wrong Credentials!");
  }
});


logoutBtn.addEventListener("click", () => {
  logoutBtn.classList.add("hidden");
  loginCredentials.classList.remove("hidden");
  bankingInterface.style.opacity = 0;
  loginUsernameElement.value = loginPINelement.value = "";
});


// Calculate and Display the Balance
const balanceElement = document.querySelector("#balance-value");
const calcDisplayBalance = (transactions => {
  const balance = transactions.reduce((acc, transaction) => acc + transaction, 0);
  balanceElement.textContent = `${balance}€`
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
  // transactionsContainer.innerHTML = "";
  
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

