'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Ayo Odukoya', //ao
  movements: [200000, 450, -400, 3000, -650, -130, 70, 13000],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Motolani Olayinka Adelusi', // moa
  movements: [50000000, 7400, -150, -790, -3210, -1000, 80500, -30],
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
  currency: 'USD',
  locale: 'en-US',
};


const account3 = {
  owner: 'Christian Otu Dhikan', // cod
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
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
  currency: 'NGN',
  locale: 'en-NG',
};

const account4 = {
  owner: 'Samuel Oluwatobiloba Adeyemo', //soa
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
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
  currency: 'USD',
  locale: 'en-US',
};

const account5 = {
  owner: 'Adetomiwa Raphael Odukoya', //aro
  movements: [5000, 3400, -150, -790, -3210, -10000, 8500, -30000],
  interestRate: 1.5,
  pin: 5555,
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

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// format movements with comma
const formatMovements = amount => amount.toLocaleString();

// default parameter as FALSE --- when sorting is clicked, it becomes true
const displayMovements = function (movements, sort = false) {
  // this gets the whole HTML child nodes 
  containerMovements.innerHTML = '';
  //? it works just like textContent = '' that takes just the text node alone

  //? in this case to continue method chaining, we use slice to get a copy of the movements array instead of the spread operator.
  const sortDisplay = sort ? movements.slice().sort((a, b) => a - b) : movements;

  sortDisplay.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
      <div class="movements__value">₦${formatMovements(mov)}</div>
    </div>
    `
    //? containerMovements is the selector to select movements container
    //? insertAdjecentHTML adds a specified js written element as text to the node of a DOM with specified position. The position is the first argument while the text to pass is the second
    containerMovements.insertAdjacentHTML('afterbegin', html);
  })
}

//? PRINT TOTAL BALANCE
const calcDisplayBalance = function (acc) {
  // we create a new property to hold the current account balance
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `₦${formatMovements(acc.balance)}`;
}

//? display summary of deposit, withdrawal, and interest
//! note: chaining methods that mutate like the splice and reverse methods should not be done in huge applications but can be done in small applications
const calcDisplaySummary = function (acc) {
  const totalDeposit = acc.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `₦${formatMovements(totalDeposit)}`;

  const totalDebit = acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `₦${formatMovements(totalDebit)}`;


  const totalInterest = acc.movements.filter(mov => mov > 0).map(interest => interest * acc.interestRate / 100).filter((interest, _i, _arr) => {
    // console.log(arr);
    return interest >= 1;
  }).reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = `₦${formatMovements(totalInterest)}`
}

const createUsername = function (accs) {
  accs.forEach(function (acc) {
    //? we create a new property called username on each iteration mutating the object
    acc.username = acc.owner.toLowerCase().split(' ').map(letter => letter[0]).join('');
  })

}
createUsername(accounts);
// console.log(accounts);

// Update the UI by making use of the different codes
const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);
  // Display balance
  calcDisplayBalance(acc);
  // Display summary
  calcDisplaySummary(acc);
}

// Event handlers
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  //? the default action of a button in form is to submit hence we prevent its default thereby, running our needed action
  e.preventDefault();

  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Dispay UI and welcome message. 
    //? Then we take the firstname by splitting and getting the first [0] 
    labelWelcome.textContent = `Welcome back ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 1;

    //? clear the input fields
    // the assignment operator works from right to left hence we use a short hand as it runs the first opertor from the right it turns to an empty string for the left
    inputLoginUsername.value = inputLoginPin.value = '';
    // remove cursor from input
    inputLoginPin.blur();

    // Update UI 
    updateUI(currentAccount);

    console.log('pin correct');
  }
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

    // Update UI 
    updateUI(currentAccount);
  }
});

//request loan
// will only grant loan if there's atleast one deposit with at least 10% of the requested loan amount
//? for example, you can only request for a loan within 10% of current deposit in account. If you have 3k in account, you can only get 30k

//Todo: TodoTask, display error message alert when loan requested is beyond highest depost in account

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = +inputLoanAmount.value;
  //0.1 is 10 percent
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // add movement
    currentAccount.movements.push(amount);

    // update UI
    updateUI(currentAccount);

    console.log('loan approved - check total balance, deposit and inflow');
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
    console.log(index);

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

  console.log(accounts);
});

// Sort movements on click
// we need to preserve the state of the button. to determine when we need to revert to default state of false
let sortedState = false;
//? adding ! to sorted state means we switch between true and false on click
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sortedState);
  sortedState = !sortedState; // this line allow everything to work
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////



// LECTURES
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

//? ARRAY METHODS - KNOWING THAT ARRAYS ARE ALSO OBJECTS SINCE THEY TAKE METHODS MEANT FOR OBJECTS

//? THE ARRAY SLICE METHOD 
// let arr = ['a', 'b', 'c', 'd', 'e', 'f'];
// slice returns the index of an array indidcating starting or ending without mutating the original
// it returns the copy of the array to slice
// console.log(arr.slice(2));
//using a negative interger means it will start from the end of the array. -2 means last two, -1 means the last and so on
// console.log(arr.slice(-3));
// the above returns ['d', 'e', 'f']
// console.log(arr.slice(1, -2));
// the above returns ['b', 'c', 'd']


//? NOTE: we can use the slice() to create a shallow copy of an array. This is done without putting a value in the slice 
// console.log(arr.slice());
// we can also use the spread operator to create a shallow copy of an array 
// console.log([...arr]);

// the best time to use slice is when you need to chain multiple methods together

//? SPLICE METHOD 
// the splice method works the same way as the slice method and the only difference is that it changes the original array by deleting the array called in the parameter
//? ONCE YOU USE SPLICE ON AN ARRAY, IT DELETES THEM FROM THE ORIGINAL ARRAY LEAVING THE ONES NOT CALLED IN SPLICE
// console.log('i am the splice',arr.splice(2));
// console.log('i am the remaining after splice',arr);

//? the most common use case is to delete the last index of an array.
// console.log('i am the deleted array', arr.splice(-1));
// console.log('i am the remaining after splice', arr);
// console.log('deleting more than one', arr.splice(1, 2));
// console.log('after more than once is deleted', arr);
// the above returns ['a', 'd', 'e', 'f']


//? REVERSE() METHOD
// it reverses the arrangement of an array
// the reverse method actually mutates the original array
// let arr = ['a', 'b', 'c', 'd', 'e', 'f'];
// const arr2 = ['l', 'k', 'j', 'i', 'h', 'g'];
// console.log(arr2.reverse());

//? CONCAT METHOD 
// concat method is used to add two arrays together. It does not mutate the original array
// let letters = arr.concat(arr2);
// console.log(letters);
//? we can also use the spread operator to concat arrays together
// console.log([...arr, ...arr2]);


//? JOIN METHOD 
// the join method converts an array to a string by putting a seperator we intend to use 
// console.log(letters.join(' + '));


//? The new array at() method
// to get an array in a position we'd normally do
// let arr = ['a', 'b', 'c', 'd', 'e', 'f'];
// console.log(arr[2]);
// console.log(arr.at(3)); 

// getting the last index of an array traditionally
// console.log(arr[arr.length - 1]);
// console.log(arr.slice(-1)[0]);
// new at method
// console.log(arr.at(-3));
//? the at method is good for method chaining too
//? The at() method also works on strings
// console.log('ayodeji'.at(3));



// BANKIST 
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// the positive values are deposits while the negative are withdrawals
//? For of loop
// for (const movement of movements) {
//   if (movement > 0) {
//     console.log(`You deposited ${movement}`);
//   } else {
//     console.log(`You withdrew ${Math.abs(movement)}`);
//   }
// }
// console.log('---- Accessing the counter variable with For of ----');
// for (const [i, movement] of movements.entries()) {
//   if (movement > 0) {
//     console.log(`${i + 1}: You deposited ${movement}`);
//   } else {
//     console.log(`${i + 1}: You withdrew ${Math.abs(movement)}`);
//   }
// }

// console.log('----- FOR EACH LOOP -----');

// movements.forEach(function (movement) {
//   if (movement > 0) {
//     console.log(`You have deposited ${movement}`);
//   } else {
//     console.log(`You withdrew ${Math.abs(movement)}`);
//   }
// })

// console.log('--- getting the counter variable with forEach ---');

// movements.forEach(function (mov, i, arr) {
//   // the first param is the current value, second is the current index and the last is the entire array
//   if (mov > 0) {
//     console.log(`${i + 1}: You deposited ${mov}`);
//   } else {
//     console.log(`${i + 1}: You withdrew ${Math.abs(mov)}`);
//   }
// })


//? when do you now use forEach or forof loop? the forEach does not break out of the loop until its done unlike the forof loop


//? USING FORECH WITH MAPS AND SETS
// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
//   ['NGN', 'Nigerian Naira'],
// ]);

//? WHEN WORKING WITH MAP() FOR EACH TAKES THE  key first, value, then the entire map just like working with arrays
// currencies.forEach(function (key, value, map) {
//   console.log(`${key}: ${value}`);
// })
//returns 
// United States dollar: USD
// Euro: EUR
// Pound sterling: GBP


//FOREACH WITH set()
//? As it is with set() it removes the duplicate and returns the unique values alone. As objects
// const currenciesUnique = new Set(['USD', 'EUR', 'GBP', 'EUR', 'USD']);
// console.log(currenciesUnique);

// currenciesUnique.forEach(function (value, _, map) {
//   //? note: the underscore means a throwaway variable which is not useful but needs to be there. More like a placeholder
//   console.log(`${value}: ${value}`);
// })
//? RETURNS
// USD: USD
// EUR: EUR
// GBP: GBP


//? CHALLENGE
// const checkDogs = function (dogsJulia, dogsKate) {
//   const juliaFindings = dogsJulia.slice();
//   juliaFindings.splice(0, 1); //0 is the start of where to delete and 1 is the delete count that is the number of things to delete
//   juliaFindings.splice(-2);
//   const addDogs = juliaFindings.concat(dogsKate);

//   addDogs.forEach(function (addDog, i, _arr) {
//     let ageCheck = addDog >= 3 ? 'adult' : 'puppy';
//     console.log(`Dog number ${i + 1} is ${addDog >= 3 ? 'an' : 'a'} ${ageCheck} and is ${addDog} years old`);
//   });
// }
// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);


//? MAP FILTER REDUCE
//? Map() works more like forEach but the main difference is that it returns a new array containing the results of applying an operation on all original array elements

//? FILTER()
//? the filter() filters for element in the original array which satisfy a certain condition. Filter returns a new array containing the array elements that passed a specified condition. Hence, elements that do not meet the condition are filtered out and not included in the new filtered array i.e [1, 2, 5, 7, 4] and check for current > 2

//? REDUCE() reduce boils (reduces) all array elements down to one single value (e.g adding all elements together)
//? reduce works like a snowball effect that keeps getting bigger as it rolls down a hill . it takes an accumulator + current index
//? This single process has redcued the whole array into one single element 


//? WORKING WITH Map()
// const eurToNGN = 752;
// const movementNGN = movements.map(function (mov) {
//   return mov * eurToNGN;
// });
// map with arrow function 
// const movementNGN = movements.map(mov => mov * eurToNGN);

// the movements array is not mutated
// console.log(movements);
// map creates a new array hence, we store it in a variabled
// console.log(movementNGN);

//? the map() method also has access to the index and entire array like forEach 
//? with map() you need to use the return keyword so the result gets pushed to the new array
// const movementDescriptions = movements.map((mov, i, arr) =>
//   `${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(mov)}`
// );
// console.log(movementDescriptions);


//? FILTER() - returns a boolean so, we only set conditions that return a boolean value to it and it only returns the new conditions in a new array

// const depositFor = movements.filter(function (mov) {
//   return mov > 0;
// });
// console.log(depositFor);

// using for of loop
// const depositByFor = [];
// for (const mov of movements) if (mov > 0) { depositByFor.push(mov) }
// console.log(depositByFor);
//? the for of loop does not allow method channing unlike the array methods which help us do better logic on the go
//? the filter method also takes the index and array
// const withdrawals = movements.filter(mov => mov < 0);
// console.log(withdrawals);


//? reduce()
// const balance = movements.reduce(function (acc, cur, i, arr) {
//   console.log(`Iteration ${i}: ${acc}`);
//   return acc + cur;
// }, 0)// 0 is the starting value of our accumulator. It can be any number depending on the use case
// console.log(balance);

// using forOf loop
// let startingValue = 0;
// for (const mov of movements) {
//   startingValue += mov;
//   console.log(startingValue);
// }

//? USING REDUCE() TO GET THE MAXIMUM VALUE IN A ARRAY
// const max = movements.reduce((acc, mov) => {
//   if (acc > mov) return acc;
//   else return mov;
// }, movements[0]);
// console.log(max);


//? CODE CHALLENGE 
// const calcAverageHumanAge = function (ages) {
//   const humanAges = ages.map(age => age <= 2 ? 2 * age : 16 + age * 4);
//   console.log(humanAges);

//   // exclude dogs < 18 that is return dogs higher than 18 years old
//   const adults = humanAges.filter(age => age >= 18);

//   // const averageAge = adults.reduce(function (acc, age) {
//   //   return acc + age;
//   // }, 0) / adults.length;
//   //? calculating average using the current array parameter
//   const averageAge = adults.reduce((acc, age, i, arr) => acc + age / arr.length, 0);
//   console.log(averageAge);
//   console.log(adults);

//   return averageAge;
// }
// const calcAverageHumanAge = ages => ages.map(age => age <= 2 ? 2 * age : 16 + age * 4).filter(age => age >= 18).reduce((acc, age, i, arr) => acc + age / arr.length, 0);

// const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

// console.log(avg1, avg2);

//? Method chaining example
// const eurToNGN = 752;
// const totalDepositNGN = movements.filter(mov => mov > 0).map(mov => mov * eurToNGN).reduce((acc, mov) => acc + mov, 0);
// console.log(totalDepositNGN);

//! NOTE: reduce() returns a value and chaining after that is impossible. Except for map() and filter() who return an array so, we can still keep on chaining the method to achieve certain results in our code


//? THE FIND METHOD 
// WE USE  the find() method to retrieve ONE ELEMENT of an array based on a condition
// the find method also receives a callback function that will be called as the method loops over the array
//? the find() method just like the filter() method returns a boolean
//? but unlike the filter, the find method DOES NOT RETURN a new array but it returns the first element in the array that satisfies the condition set

//? the find method returns the first element - element alone without an array more like a value --- while the filter returns a whole array with the conditions

// const firstWidthdrawal = movements.find(mov => mov < 0);
// console.log(firstWidthdrawal);

// console.log(accounts);

// const findAccount = accounts.find(acc => acc.owner === 'Motolani Olayinka Adelusi');
// console.log(findAccount);

// for (const acc of accounts) {
//   if (acc.owner === 'Motolani Olayinka Adelusi') {
//     console.log(acc);
//   } else {
//     console.log('undefined');
//   }
// }


//? Some and Every
// some and every tests for a condition and enables us to write better logic unlike includes that tests for a single condition and thats where the some method comes into play
// CHECKS FOR EQUALITY
// console.log(movements.includes(-10));

// SOME
// CAN SPECIFY CONDITION - if there is ANY value for which condition is true
// const checkSome = movements.some(mov => mov > 0);
// console.log(checkSome);


// EVERY
//? Every returns true if ALL the conditions we pass into the array returns true
// console.log(movements.every(mov => mov > 0));
// the above returns false since not all our movements are deposits alone
// console.log(account4.movements.every(mov => mov > 0));
// the above returns true since all our movements are deposits alone


//? TIP we can also pass the same function to a callback if its being reused
// const example = mov => mov > 0;
// movements.every(example);
// movements.some(example);
// movements.filter(example);


//? Flat and FlatMap
// flat() Returns a new array with all sub-array elements concatenated into it recursively up to the specified depth.
// the flat method puts different array inside one array
// const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
// console.log(arr.flat());

// flat only runs by 1 depth of the array meaning deeply nested arrays are not flattened hence, we specify the DEPTH
// const arrDeep = [[1, [2, 3]], [4, [5, 6]], 7, 8];
// console.log(arrDeep.flat(2)); // we go two levels deep

// const newAcc = accounts.map(acc => acc.movements).flat().reduce((acc, mov) => acc + mov, 0);

// console.log(newAcc);

//? looking at the example above, we use map to get our movements data out to a new array then flatten it. For better performance, the flatMap was created
//?FlatMap()
// const newAcc2 = accounts.flatMap(acc => acc.movements).reduce((acc, mov) => acc + mov, 0);
// console.log(newAcc2);
// it first map over the original array then flattens it
//? Note: the flatMap only goes one level deep and if we need to go more than one level then the approach of using map then flat to state the depth is needed.


//? Sorting() in javaScript. It mutates the original array and arranges elements alphabetically if need be. By default it does the sorting by strings. It converts elements to strings then sorts by default
// Strings
// const owners = ['Ayo', 'Motolani', 'Chris', 'Samuel'];

// Numbers
// if we return < 0 then  A will be before B (keep order)
// if we return > 0 then, B will be before A (switch order)
//? ASCENDING ORDER
// console.log(movements.sort((a, b) => {
//   // sort by ascending order
//   if (a > b) return 1; // or write it like so a > b and a < b
//   if (b > a) return -1;
// }));
// console.log(owners.sort((a, b) => {
//   if (a > b) return 1;
//   if (b > a) return -1;
// }));
// movements.sort((a, b) => a - b);
// console.log(movements);
// owners.sort((a, b) => a - b);
// console.log(owners);

//? DESCENDING ORDER
// console.log(movements.sort((a, b) => {
//   // sort by ascending order
//   if (a < b) return 1;
//   if (b < a) return -1;
// }));
// movements.sort((a, b) => b - a); // optimize the code
// console.log(movements);
// owners.sort((a, b) => b - a);
// console.log(owners);
// console.log(owners.sort((a, b) => {
//   if (a < b) return 1;
//   if (b < a) return -1;
// }));


// How to programtically create and fill arrays
// const arr = [1, 2, 3, 4, 5, 6, 6, 7];
// const x = new Array(7);
// console.log(x.fill(1, 3, 5)); // the fill method programtically adds new index to an array the first arguement is for the data to add, the second is start and the last is the end. It can also take a single value alone which is what will fill the entire array.

//? Array.from() is a new array method created
//? we use the .from on the Array construction - new Array()
//? The array new Array is a function and we call the .from() METHOD on it
// const y = Array.from({ length: 7 }, () => 1);
// console.log(y);

// const z = Array.from({ length: 7 }, ((_, i) => i + 1));
// console.log(z);

// const random = Array.from({ length: 101 }, () => Math.floor(Math.random() * (100 + 1)));
// console.log(random);


// function getRandomInt(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// const randomNumber = getRandomInt(1, 100);


//? We can even use Array.from() on Iterables like Map() and Set()
//? Also, we can use this for .querySelectorAll() to get data FROM the UI
//? we were able to convert a DOM node to an array

// labelBalance.addEventListener('click', function () {
//   const MovementsUI = Array.from(document.querySelectorAll('.movements__value'), el => Number(el.textContent.replace('₦', '')));
//   console.log(MovementsUI);
// });


// ARRAY METHOD PRACTICES 
//? EXERCEISE 1
//! you got this
// const bankDeposits = accounts.flatMap(account => account.movements).filter(deposit => deposit > 0).reduce((totalDeposit, account) => totalDeposit + account, 0);
// console.log(bankDeposits);

//? EXERCISE 2
//! you almost got this
// COUNT THE AMOUNT OF DEPOST IN THE BANK WITH AT LEAST ONE THOUSAND NAIRA
// const numDeposits = accounts.flatMap((acc) => acc.movements).filter((acc, i) => acc >= 1000).length; // 9 deposits
// console.log(numDeposits);

//!Count using reduce()

// const numDepositsWithReduce = accounts.flatMap((acc) => acc.movements).reduce((count, cur) => (cur >= 1000 ? count + 1 : count), 0);
// console.log(numDepositsWithReduce);

//? 3
//? CREATING A BRAND NEW OBJECT USING THE REDUCE METHOD
//? CREATE A BRAND NEW OBJECT THAT CONTAINS THE SUM OF THE DEPOSITS AND WITHDRAWALS
// we create new objects (deposit and withdrawal) and each iteration we push in based on condition
// create a new object
// reduce boild down an array to a value yet we can for an object
// CALCULATE TO SUMS AT THE SAME TIME OR PERFORM TWO AT A TIME USING RECUCE()
//? THE initial value of the accumulator has to be an object since we are creating an object

// we can destructure our deposits and withdrawals by changing it from const sum. SO WE HAVE ACCESS TO THE DIFFERENT DATA
// const { deposit, withdrawal } = accounts.flatMap((acc) => acc.movements).reduce((sums, cur) => {
// we access the accumulator values of dep and withd to add based on the condition of if its higher than zero or below. we then add the current value to the acc at each iteration +=
// as we have a function with curley braces we have to return the accumulator from the function - arrow returns implicitly and not explicitly
// cur > 0 ? (sums.deposit += cur) : (sums.withdrawal += cur);
//? THE ABOVE CAN BE WRITTEN LIKE BELOW
// sums[cur > 0 ? 'deposit' : 'withdrawal'] += cur;
// return sums;
// }, { deposit: 0, withdrawal: 0 });// deposit and withd are our accumulator since they are the initial value of our reducer
// console.log(deposit, withdrawal);

// const { credit, debit } = accounts.flatMap(acc => acc.movements).reduce(function (total, cur) {
//   total[cur > 0 ? 'credit' : 'debit'] += cur;
//   return total;
// }, { credit: 0, debit: 0 });
// console.log(`${credit} is a credit and`, `${debit} is the debit`);

// 4. Convert string to TitleCase
// const convertTitle = function (title) {

//   const capitalize = str => str[0].toUpperCase() + str.slice(1);

//   const exceptions = ['a', 'and', 'an', 'am', 'the', 'but', 'or', 'on', 'in', 'with'];
//   const titleCase = title.toLowerCase().split(' ').map(word => exceptions.includes(word) ? word : capitalize(word)).join(' ');

//   return capitalize(titleCase);
// }
// console.log(convertTitle('I AM a StrinG'));
// console.log(convertTitle('yes you are anD we Know'));
// console.log(convertTitle('but will make YOU title case'));


//? Code challenge
// END GOAL: check if dogs are > too much or little
// Too much means the dog's current food is > than the recommended portion eating little is <
// eating okay means the dog's current food portion is within a range 10% above and 10% above and below the recommended portion
//? code to get 10%: current > (recommended * 0.90) && current < (recommended * 1.10)

// const dogs = [
//   { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
//   { weight: 8, curFood: 200, owners: ['Matilda'] },
//   { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
//   { weight: 32, curFood: 340, owners: ['Michael'] },
// ];

// Challenge 0.1
// const getPortion = dogs.forEach(function (dog) {
//   // can also use Math.trunc() to get rid of the decimal too
//   dog.recommendedFood = Math.round(dog.weight ** 0.75 * 28);
//   console.log(dog);
// });

// Challenge 0.2
// const sarahDog = dogs.find(dog => dog.owners.includes('Sarah'));
// console.log(`Sarah's dog is eating too ${sarahDog.curFood > sarahDog.recommendedFood ? 'much' : 'little'}`);


// Challenge 0.3
// const ownersEatTooMuch = dogs.filter(dog => dog.curFood > dog.recommendedFood).flatMap(dog => dog.owners);
// const ownersEatTooLittle = dogs.filter(dog => dog.curFood < dog.recommendedFood).flatMap(dog => dog.owners);
// console.log(ownersEatTooMuch, ownersEatTooLittle);

// Challenge 0.4
// console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`);
// console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`);

// Challenge 0.5
// console.log(dogs.some(dog => dog.curFood === dog.recommendedFood));
// false

// Challenge 0.6 
// FORMULAR TO CHECK EATING OKAY --- current > (recommended * 0.90) && current < (recommended * 1.10)
// const checkEatingOkay = dog => dog.curFood > (dog.recommendedFood * 0.90) && dog.curFood < (dog.recommendedFood * 1.10)

// console.log(dogs.some(checkEatingOkay));

// Challenge 0.7
// console.log(dogs.filter(checkEatingOkay));

// Chalenge 0.8
// a and b in this instance automiatically become the objects we want to sort hence, we can have access to the object data we need
// const dogSortedCopy = dogs.slice().sort((a, b) => a.recommendedFood - b.recommendedFood);
// console.log(dogSortedCopy);


// NUMBERS IN JS
//? How numbers work in JS
//? How to convert numbers
//? Check if certain values are numbers

// numbers have decimals so 23 === 23.0 returns true
// numbers are always stored in a binary format - they consist of 0s and 1s
// Base 10 is what we are used to 0 - 9
// Binary base 2 are 0 - 1

//? we can convert string to number doing 
//? We convert string to number using Number() and + before the string number
// console.log(Number(23));
// we can also convert string to number by adding '+' hence, js performs a type coercion
// console.log(+'23');

//? Parsing
//? parse interger
// console.log(Number.parseInt('30px', 10)); //the number has to come b4 the string else NaN

//? Go to when you need to read a value coming from css. it removes the string
// console.log(Number.parseFloat('2.5rem'));
// the below is a old school way to write it now we use Number() as namespace to it
// console.log(Number.parseFloat('2.5rem'));

// Check if a value its NaN
// console.log(Number.isNaN(20)); // false
// console.log(Number.isNaN('20')); // true

// Check if to check if something is a number or NaN
//? Your goto to check if a value is a number
// console.log(Number.isFinite(10)); // returns true
// console.log(Number.isFinite('10')); // returns false
// console.log(Number.isFinite('10p')); // returns false
// console.log(Number.isFinite(20 / 3)); // returns true cos this returns infinity


//? Math and Rounding
console.log(Math.sqrt(25)); // 5
console.log(25 ** (1 / 2)); // same answer as 5. Explicit way of writing square root
console.log(8 ** (1 / 3)); // check for the cubic root
