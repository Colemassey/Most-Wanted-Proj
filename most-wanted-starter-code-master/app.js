"use strict"


//Menu functions.
//Used for the overall flow of the application.
/////////////////////////////////////////////////////////////////
//#region 

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      searchResults = searchByTrait(people);
      // searchResults = searchByEyeColor(people);
      // searchResults = searchByGender(people);
      // searchResults = searchByDob(people);
      // searchResults = searchByOccupation(people);
      // searchResults = searchByHeight(people);
    // TODO: search by traits
      break;
      default:
    app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){
  
  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = promptFor("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", autoValid);

  switch(displayOption){
    case "info":
      displayPerson(person);
    break;
    case "family":
    // TODO: get person's family
      viewSpouse(people, person);
      // viewParents(people, person);
    break;
    case "descendants":
    // TODO: get person's descendants
      viewDescendants(people, person);
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

//#endregion

//Filter functions.
//Ideally you will have a function for each trait.
/////////////////////////////////////////////////////////////////
//#region 

//nearly finished function used to search through an array of people to find matching first and last name and return a SINGLE person object.
function searchByName(people){
  let firstName = promptFor("What is the person's first name?", autoValid);
  let lastName = promptFor("What is the person's last name?", autoValid);

  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.firstName === firstName && potentialMatch.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  foundPerson = foundPerson[0]
  // TODO: find the person single person object using the name they entered.
  return foundPerson;
}

//unfinished function to search through an array of people to find matching eye colors. Use searchByName as reference.
function searchByEyeColor(people){
  let eyeColor = promptFor("What is the person's eye color?", autoValid);
  let foundEyeColor = people.filter(function(potentialMatch){
    if(potentialMatch.eyeColor === eyeColor){
      return true;
    }
    else{
      return false;
    }
  })
  if(foundEyeColor.length === 0){
    alert("There is no one with that eye color.")
    return searchByEyeColor(people);
  }
  return foundEyeColor

}

//TODO: add other trait filter functions here.

function searchByGender(people){
  let gender = promptFor("What is the person's gender? male or female", autoValid);
  let foundGender = people.filter(function(potentialMatch){
    if(potentialMatch.gender === gender){
      return true;
    }
    else{
      return false;
    }
  })
  if(foundGender.length === 0){
    alert("There is no one with that gender.")
    return searchByGender(people);
  }
  return foundGender
}

function searchByDob(people){
  let dob = promptFor("What is the person's date of birth? mm/dd/yyyy", autoValid);
  let foundDob = people.filter(function(potentialMatch){
    if(potentialMatch.dob === dob){
      return true;
    }
    else{
      return false;
    }
  })
  if(foundDob.length === 0){
    alert("There is no one with that date of birth.")
    return searchByDob(people);
  }
  return foundDob

}

function searchByOccupation(people){
  let occupation = promptFor("What is the person's job?", autoValid);
  let foundOccupation = people.filter(function(potentialMatch){
    if(potentialMatch.occupation === occupation){
      return true;
    }
    else{
      return false;
    }
  })
  if(foundOccupation.length === 0){
    alert("There is no one with that eye color.")
    return searchByOccupation(people);
  }
  return foundOccupation

}

function searchByHeight(people){
  let height = parseInt(promptFor("How tall is the person?", autoValid)); //parseInt turns string response into a numeric value.
  let foundHeight = people.filter(function(potentialMatch){
    if(potentialMatch.height === height){
      return true;
    }
    else{
      return false;
    }
  })
  if(foundHeight.length === 0){
    alert("There is no one with that height.")
    return searchByHeight(people);
  } 
  return foundHeight

}

function searchByTrait(people){
  let traitFilter = people
  let response = prompt("Would you like to search by gender? Enter 'yes' or 'no'.")
  if(response === 'yes'){
  traitFilter = searchByGender(traitFilter);
  alert(displayPeople(traitFilter));
  }
  response = prompt("Would you like to search by eye color? Enter 'yes' or 'no'.")
  if(response === 'yes'){
  traitFilter = searchByEyeColor(traitFilter);
  alert(displayPeople(traitFilter));
  }
  response = prompt("Would you like to search by height? Enter 'yes' or 'no'.")
  if(response === 'yes'){
  traitFilter = searchByHeight(traitFilter);
  alert(displayPeople(traitFilter));
  if (traitFilter.length < 2){
    traitFilter = traitFilter[0]
    return traitFilter;
  }}
  response = prompt("Would you like to search by occupation? Enter 'yes' or 'no'.")
  if(response === 'yes'){
  traitFilter = searchByOccupation(traitFilter);
  if (traitFilter.length < 2){
    traitFilter = traitFilter[0]
    return traitFilter;
  }}
  response = prompt("Would you like to search by date of birth? Enter 'yes' or 'no'.")
  if(response === 'yes'){
  traitFilter = searchByDob(traitFilter);
  if (traitFilter.length < 2){
    traitFilter = traitFilter[0]
    return traitFilter;
  }}

  if (traitFilter.length > 1){
    alert("These are the people who show the traits you searched.")
    displayPeople(traitFilter);
    return app(people);
  }
  else {
    traitFilter = traitFilter[0]
    return traitFilter;
  }
}

function viewDescendants(people, parent){
  let filterDescendants = people.filter(function(person){
    if (person.parents.includes(parent.id)){
      return true;
    }
    else{
      return false;
    }
    })
    displayPeople(filterDescendants)
    return filterDescendants;

}

function viewSpouse(people, currentSpouse){
  let filterSpouse = people.filter(function(person){
    if (person.currentSpouse === currentSpouse.id){
      return true;
    }
    else{
      return false;
    }
    })
    return filterSpouse;
}

function viewParents(people, parents){
  filterParent = people.filter(function(person){
    if (person.parent.includes(parent.id)){
      return true;
    }
      else{
      return false;
    }
    })
    displayPeople(filterParent)
    return filterParent;
}

//#endregion

//Display functions.
//Functions for user interface.
/////////////////////////////////////////////////////////////////
//#region 

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Age: " + person.dob + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  // TODO: finish getting the rest of the information to display.
  alert(personInfo);
  return mainMenu(person);
}

//#endregion



//Validation functions.
//Functions to validate user input.
/////////////////////////////////////////////////////////////////
//#region 

//a function that takes in a question to prompt, and a callback function to validate the user input.
//response: Will capture the user input.
//isValid: Will capture the return of the validation function callback. true(the user input is valid)/false(the user input was not valid).
//this function will continue to loop until the user enters something that is not an empty string("") or is considered valid based off the callback function(valid).
function promptFor(question, valid){
  let isValid;
  do{
    var response = prompt(question).trim();
    isValid = valid(response);
  } while(response === ""  ||  isValid === false) //write validation condition.
  return response;
}

// helper function/callback to pass into promptFor to validate yes/no answers.
function yesNo(input){
  if(input.toLowerCase() == "yes" || input.toLowerCase() == "no"){
    return true;
  }
  else{
    return false;
  }
}

// helper function to pass in as default promptFor validation.
//this will always return true for all inputs.
function autoValid(input){
  return true; // default validation only
}

//Unfinished validation function you can use for any of your custom validation callbacks.
//can be used for things like eye color validation for example.
// function customValidation(input){
//   if{
//     alert("True")
//     continue;
//   }
//   else if(input = "" ){

//   }
//   else{
//     alert("There is no one with that trait.")
//     return false;
//   }
// }

//#endregion