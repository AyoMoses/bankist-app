'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Ayo Odukoya', //ao
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Motolani Olayinka Adelusi', // moa
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};


const account3 = {
  owner: 'Christian Otu Dhikan', // cod
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Samuel Oluwatobiloba Adeyemo', //soa
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const account5 = {
  owner: 'Adetomiwa Raphael Odukoya',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 5555,
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

const displayMovements = function (movements) {
  // this gets the whole HTML child nodes 
  containerMovements.innerHTML = '';
  //? it works just like textContent = '' that takes just the text node alone

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
      <div class="movements__value">₦${mov}</div>
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
  labelBalance.textContent = `₦${acc.balance}`;
}

//? display summary of deposit, withdrawal, and interest
//! note: chaining methods that mutate like the splice and reverse methods should not be done in huge applications but can be done in small applications
const calcDisplaySummary = function (acc) {
  const totalDeposit = acc.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `₦${totalDeposit}`;

  const totalDebit = acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `₦${Math.abs(totalDebit)}`;

  const totalInterest = acc.movements.filter(mov => mov > 0).map(interest => interest * acc.interestRate / 100).filter((interest, i, arr) => {
    // console.log(arr);
    return interest >= 1;
  }).reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = `₦${totalInterest}`
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

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
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
  const amount = Number(inputTransferAmount.value);
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
  
  const amount = Number(inputLoanAmount.value);
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

  if (inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin) {
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
})

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
