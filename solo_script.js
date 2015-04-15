// ! ! !
// Three Bugs

// BUG 1: we were sending the array of arrays into calculateSTI instead of iterating through each array. Corrected by sending array[i] instead.
// BUG 2: bonus (STI percentage) was coming out negative. Because we return basePercent - 1 for no good reason. "- 1" removed.
// BUG 3: no rounding on newArray[3] to whole dollar as instructed (I also rounded newArray[2], but to two decimals).

var arrayAtticus = ["Atticus", "2405", "47000", 3];
var arrayJem = ["Jem", "62347", "63500", 4];
var arrayBoo = ["Boo", "11435", "54000", 3];
var arrayScout = ["Scout", "6243", "74750", 5];

var array = [arrayAtticus, arrayJem, arrayBoo, arrayScout];

//Create variables used to write to the DOM
var newEl, newText, position;

//Capture the position of insertion into the DOM
position = document.getElementById('content');

//Loop the array, extracting each array and writing information to the DOM
//Note that the information is not 'clean'
// OVERWRITES ARRAY WITH NEW ARRAY AND PRINTS EACH ARRAY TO THE DOM
for(var i = 0; i < array.length; i++){
	// BUG 1: Run calculateSTI on the entire array and put in each slot, but calculateSTI only takes array[0] (Atticus.) Correct by sending array[i] instead.
  array[i] = calculateSTI(array[i]);

 	newEl = document.createElement('li');
	newText = document.createTextNode(array[i]);
	newEl.appendChild(newText);
	position.appendChild(newEl);
}

function calculateSTI(array){
  var newArray = [];

  newArray[0] = array[0];

  var employeeNumber = array[1];
  var baseSalary = array[2];
  var reviewScore = array[3];
  //bonus is the STI percentage.
  // BUG 2: bonus is coming out negative. why? 
  // because we return basePercent - 1 for no good reason.
  var bonus = getBaseSTI(reviewScore) + getYearAdjustment(employeeNumber) - getIncomeAdjustment(baseSalary);
  if(bonus > 0.13){
    bonus = 0.13;
  }

  newArray[1] = " "+bonus;
  newArray[2] = " "+Math.round(baseSalary * (1.0 + bonus)*100)/100;
  // BUG 3: no rounding on newArray[3] as instructed (I rounded newArray[2] as well.
  newArray[3] = " "+Math.round(baseSalary * bonus);
  console.log(newArray[0] + " " + newArray[1] + " " + newArray[2] + " " + newArray[3]);
  //Prints array to console.
  return newArray;
}

function getBaseSTI(reviewScore){
  var basePercent;
  switch(reviewScore){
    case 1:
      basePercent = 0;
      break;
    case 2:
      basePercent = 0;
      break;
    case 3:
      basePercent = 0.04;
      break;
    case 4:
      basePercent = 0.06;
      break;
    case 5:
      basePercent = 0.10;
      break;
  }
  return basePercent; // Removed - 1 (Bug 2).
}

function getYearAdjustment(employeeNumber){
  var yearAdjustment = 0;
  if(employeeNumber.length == 4){
    yearAdjustment = 0.05;
  }
  return yearAdjustment;
}

function getIncomeAdjustment(salary){
  var incomeAdjustment = 0;
  salary = parseInt(salary);
  if(salary > 65000){
    incomeAdjustment = 0.01;
  }
  return incomeAdjustment;
}