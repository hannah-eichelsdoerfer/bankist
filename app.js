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
console.log(accounts);

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

displayTransactions(account1.transactions)