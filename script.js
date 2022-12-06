'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Ayo Odukoya',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Motolani Olayinka Adelusi',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};


const account3 = {
  owner: 'Christian Otu Dhikan',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Samuel Adeyemo Oluwatobiloba',
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
      <div class="movements__value">${mov}</div>
    </div>
    `
    //? containerMovements is the selector to select movements container
    //? insertAdjecentHTML adds a specified js written element as text to the node of a DOM with specified position. The position is the first argument while the text to pass is the second
    containerMovements.insertAdjacentHTML('afterbegin', html);
  })
}

displayMovements(account1.movements);

const createUsername = function (accs) {
  accs.forEach(function (acc) {
    //? we create a new property called username on each iteration mutating the object
    acc.username = acc.owner.toLowerCase().split(' ').map(letter => letter[0]).join('');
  })

}
createUsername(accounts);
console.log(accounts);

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

const depositFor = movements.filter(function (mov) {
  return mov > 0;
});
console.log(depositFor);

// using for of loop
// const depositByFor = [];
// for (const mov of movements) if (mov > 0) { depositByFor.push(mov) }
// console.log(depositByFor);
//? the for of loop does not allow method channing unlike the array methods which help us do better logic on the go
//? the filter method also takes the index and array
const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);
