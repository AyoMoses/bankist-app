'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Ayo Odukoya', //ao
  movements: [2000000, 450, -400, 3000, -6050, -130, 70, 13000],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-01-04T17:01:17.194Z',
    '2023-01-03T23:36:17.929Z',
    '2023-01-02T10:51:36.790Z',
  ],
  currency: 'GBP',
  locale: 'en-GB', // de-DE
};

const account2 = {
  owner: 'Motolani Olayinka Adelusi', // moa
  movements: [50000, 7400, -150, -790, -3210, -1000, 800000, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:31:06.386Z',
    '2020-04-10T14:48:26.374Z',
    '2020-06-25T18:59:59.371Z',
    '2020-07-26T12:08:20.894Z',
  ],
  currency: 'GBP',
  locale: 'en-GB',
};


const account3 = {
  owner: 'Adetomiwa Raphael Odukoya', //aro
  movements: [500000, 3400, -150, -790, -3210, -10000, 8500, -30000],
  interestRate: 1.5,
  pin: 3333,
  movementsDates: [
    '2022-11-01T13:15:33.035Z',
    '2022-11-30T09:48:16.867Z',
    '2022-12-25T06:04:23.907Z',
    '2022-01-25T14:18:46.235Z',
    '2022-02-05T16:33:06.386Z',
    '2021-04-10T14:43:26.374Z',
    '2021-06-25T18:49:59.371Z',
    '2021-07-26T12:01:20.894Z',
  ],
  currency: 'GBP',
  locale: 'en-GB',
};


const account4 = {
  owner: 'Christian Otu Dhikan', // cod
  movements: [2000, -200, 3400, -300, -20, 50, 1400, -4600],
  interestRate: 0.7,
  pin: 4444,
  movementsDates: [
    '2021-11-01T13:11:33.035Z',
    '2018-11-30T09:18:16.867Z',
    '2021-12-25T06:05:23.907Z',
    '2018-01-25T14:19:46.235Z',
    '2021-02-05T16:35:06.386Z',
    '2020-04-10T14:44:26.374Z',
    '2019-06-25T18:42:59.371Z',
    '2018-07-26T12:09:20.894Z',
  ],
  currency: 'GBP',
  locale: 'en-GB',
};

const account5 = {
  owner: 'Samuel Oluwatobiloba Adeyemo', //soa
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 5555,
  movementsDates: [
    '2022-11-01T13:15:33.035Z',
    '2019-11-30T09:18:16.867Z',
    '2022-12-25T06:04:23.907Z',
    '2021-01-25T14:18:46.235Z',
    '2019-02-05T16:53:06.386Z',
    '2022-04-10T14:43:26.374Z',
    '2020-06-25T18:29:59.371Z',
    '2022-07-26T12:03:20.894Z',
  ],
  currency: 'NGN',
  locale: 'en-NG',
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');
const lableLogoutPrompt = document.querySelector('.logout-prompt');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnLogout = document.querySelector('.logout-section__logout-button');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputLogin = document.querySelector('.login__input');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//? format movements with comma --- manual formatter code i wrote
// const formatMovements = amount => amount.toLocaleString(); //.toFixed(2)

// a cross codebase reusable currency formatter
const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
}

const formatMovementDates = function (date, locale) {

  const calcDaysPassed = (date1, date2) => Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  const daysPassed = calcDaysPassed(new Date(), date);
  // console.log(daysPassed);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed === 2) return '2 days ago';
  if (daysPassed === 3) return '3 days ago';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  // if the above code are not executed then the below code are fall back as else
  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}`;
  return new Intl.DateTimeFormat(locale).format(date);
}


// Use time to display greeting
const printWelcome = function (name) {
  const now = new Date();
  const greetings = new Map([
    [[6, 7, 8, 9, 10], 'Good Morning'],
    [[11, 12, 13, 14], 'Good Day'],
    [[15, 16, 17, 18], 'Good Afternoon'],
    [[19, 20, 21, 22], 'Good Evening'],
    [[23, 0, 1, 2, 3, 4, 5], 'Good Night'],
  ]);

  const arr = [...greetings.keys()].find(key => key.includes(now.getHours()));
  const greet = greetings.get(arr);
  labelWelcome.textContent = `${greet} ${name}!`;
}

// default parameter as FALSE --- when sorting is clicked, it becomes true
const displayMovements = function (account, sort = false) {
  // this gets the whole HTML child nodes 
  containerMovements.innerHTML = '';
  //? it works just like textContent = '' that takes just the text node alone
  //? in this case to continue method chaining, we use slice to get a copy of the movements array instead of the spread operator.
  const sortDisplay = sort ? account.movements.slice().sort((a, b) => a - b) : account.movements;

  sortDisplay.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(account.movementsDates[i]);// on current index we get the data

    // format dates using the intl. Number
    const displayDate = formatMovementDates(date, account.locale);


    const formattedAmount = formatCur(mov, account.locale, account.currency);

    // in front of mov we can add toFixed(2) to add two decimal numbers at the end of our value
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
      <div class="movements__date">${displayDate}</div>
      <div class="movements__value">${formattedAmount}</div>
    </div>
    `
    //? containerMovements is the selector to select movements container
    //? insertAdjecentHTML adds a specified js written element as text to the node of a DOM with specified position. The position is the first argument while the text to pass is the second
    containerMovements.insertAdjacentHTML('afterbegin', html);
  })
}
displayMovements(account1);

//? PRINT TOTAL BALANCE
const calcDisplayBalance = function (acc) {
  // we create a new property to hold the current account balance
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  const formattedAmount = formatCur(acc.balance, acc.locale, acc.currency);
  labelBalance.textContent = `${formattedAmount}`;
}

//? display summary of deposit, withdrawal, and interest
//! note: chaining methods that mutate like the splice and reverse methods should not be done in huge applications but can be done in small applications
const calcDisplaySummary = function (acc) {
  const totalDeposit = acc.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);

  labelSumIn.textContent = `${formatCur(totalDeposit, acc.locale, acc.currency)}`;

  const totalDebit = acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${formatCur(Math.abs(totalDebit), acc.locale, acc.currency)}`;


  const totalInterest = acc.movements.filter(mov => mov > 0).map(interest => interest * acc.interestRate / 100).filter((interest, _i, _arr) => {
    // console.log(arr);
    return interest >= 1;
  }).reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = `${formatCur(totalInterest, acc.locale, acc.currency)}`
}

const createUsername = function (accs) {
  accs.forEach(function (acc) {
    //? we create a new property called username on each iteration mutating the object
    acc.username = acc.owner.toLowerCase().split(' ').map(letter => letter[0]).join('');
  });

}
createUsername(accounts);
// console.log(accounts);

// Update the UI by making use of the different codes
const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);
  // Display balance
  calcDisplayBalance(acc);
  // Display summary
  calcDisplaySummary(acc);
}

const startLogOutTimer = function () {
  // Set time to 5 minutes
  let time = 300; //300 is 5 minutes 60seconds * 5minutes

  const tick = function () {
    // Get minute of timer
    // convert to a string to be able to use padstart since its a number
    const min = String(Math.trunc(time / 60)).padStart(2, '0'); // 60 seconds
    const sec = String(time % 60).padStart(2, '0');

    // In each call, print the remaining timer to the UI
    labelTimer.textContent = `${min}:${sec}`;

    //! TASK - CHANGE TEXT COLOR TO RED WHEN TIMER IS LESS THAN 1 MINUTE WHEN MIN < 1 AND BLINK IT

    // When 0 seconds, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Login to get started';
      containerApp.style.opacity = 0;
    }

    // change color of text before logout
    const logoutPrompt = min < 1 ? 'You have less than' : 'You will be logged out in';
    const changePromptColor = min < 1 ? 'offline' : 'online';
    const html = `
    <span class="logout-prompt__${changePromptColor}">${logoutPrompt}</span>
    `
    lableLogoutPrompt.innerHTML = html;

    // Decrease 1s on each function call
    time--; // timer = timer - 1;
  }

  // Call the timer every second
  tick();
  const timer = setInterval(tick, 1000);

  // to fix the bug about timer not working in other users since more than one runs at the same time we need to return timer to have access to it
  return timer;
}

// Event handlers. The timer variable is needed globally for the to persist across different login. Since its used in the btnLogin and other functions hence, its used as a parent scope
let currentAccount, timer;

// FAKE LOGGED IN STATE
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 1;

btnLogin.addEventListener('click', function (e) {
  //? the default action of a button in form is to submit hence we prevent its default thereby, running our needed action
  e.preventDefault();

  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  console.log(`Account belongs to ${currentAccount.owner.split(' ')[0]}`);

  if (currentAccount && currentAccount.pin === +inputLoginPin.value) {
    // Dispay UI and welcome message. 
    //? Then we take the firstname by splitting and getting the first [0] 
    // labelWelcome.textContent = `Welcome back ${currentAccount.owner.split(' ')[0]}`;
    printWelcome(`${currentAccount.owner.split(' ')[0]}`);
    containerApp.style.opacity = 1;

    // create current time and date

    //? locale time and date using JS IntDateTimeFormat API
    const now = new Date();
    // writing the configuration object to be passed to the DateTimeFormat object is necessary
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'long', // you can also use 2-digit which shows 08 for august for example
      year: 'numeric',
      weekday: 'short'
      // there is the 'short' opt which shows the string as 'mon, tue, aug, sep' for example and 'narrow' which shows it as letter alone 'M, T, A, J'
    }
    // const userLocale = navigator.language;
    // console.log(userLocale);
    labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(now); // the value passed creates a formatter based on the language passed


    //? manual local time and date
    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

    //? clear the input fields
    // the assignment operator works from right to left hence we use a short hand as it runs the first opertor from the right it turns to an empty string for the left
    inputLoginUsername.value = inputLoginPin.value = '';
    // remove cursor from input
    inputLoginPin.blur();

    // Update UI 
    updateUI(currentAccount);

    // check if there is already a timer running in another account and clear it
    if (timer) clearInterval(timer);

    // Start countdown timer 
    timer = startLogOutTimer();

    console.log('pin correct');
  }
});

// Logout button
btnLogout.addEventListener('click', function() {
  labelWelcome.textContent = "Log in to get started";
  containerApp.style.opacity = 0;
  clearInterval(timer);
});
btnLogout.addEventListener('mouseover', function(){
  btnLogout.textContent = 'for real?';
});
btnLogout.addEventListener('mouseout', function(){
  btnLogout.textContent = 'logout now';
});

// Tranfer amount 
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value; //using + is cleaner than user Number()
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);
  // console.log(`${currentAccount.owner} initiated transfer of ₦${amount}, to ${receiverAcc.owner}`);
  inputTransferAmount.value = inputTransferTo.value = '';
  inputTransferTo.blur();
  inputTransferAmount.blur();


  if (amount > 0 && receiverAcc
    && currentAccount.balance >= amount && receiverAcc?.username !== currentAccount.username) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI 
    updateUI(currentAccount);

    // reset timer when user remains active doing something on the app. We clear the current time and start a new one
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

//request loan
// will only grant loan if there's atleast one deposit with at least 10% of the requested loan amount
//? for example, you can only request for a loan within 10% of current deposit in account. If you have 3k in account, you can only get 30k

//Todo: TodoTask, display error message alert when loan requested is beyond highest depost in account

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);
  //0.1 is 10 percent
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {

    // add movement
    setTimeout(function () {
      currentAccount.movements.push(amount);

      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // update UI
      updateUI(currentAccount);

      console.log('loan approved - check total balance, deposit and inflow');

      // reset timer when user remains active doing something on the app. We clear the current time and start a new one
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 2500)
  }
  inputLoanAmount.value = '';
})


// close account
btnClose.addEventListener('click', function (e) {
  e.preventDefault();


  // check for correct credentials - if user and pin = input value
  // const user = accounts.find(acc => acc.username === inputCloseUsername.value && Number(inputClosePin.value));
  // console.log('details correct after check');

  //using + is cleaner than user Number()
  if (inputCloseUsername.value === currentAccount.username && +inputClosePin.value === currentAccount.pin) {
    //? The findindex returns the first index that returns true and not the element itself unlike find()
    const index = accounts.findIndex(acc => acc.username === currentAccount.username);
    // console.log(index);

    // Delete account 
    accounts.splice(index, 1);

    // Hide the UI
    containerApp.style.opacity = 0;

    //! PERSONAL TASK - SHOW ERROR MESSAGE ALERT WHEN USER IS DELETED AND LOGIN IS ATTEMPTED - THIS WILL BE A CHECK IN THE LOGIN FIELDS by checking for 'undefined' in input value

    // some and every
  }

  //? find and findIndex were added in ES6 and old browsers will not run them

  // put this after the if else statement to prevent bug setting the input to empty before if else even runs
  inputCloseUsername.value = inputClosePin.value = '';
  inputClosePin.blur();

  // console.log(accounts);
});

// Sort movements on click
// we need to preserve the state of the button. to determine when we need to revert to default state of false
let sortedState = false;
//? adding ! to sorted state means we switch between true and false on click
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sortedState);
  sortedState = !sortedState; // this line allow everything to work
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
