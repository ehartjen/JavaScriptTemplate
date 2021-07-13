function getNumbers() {
    //access the webpage and get the values from the inputs
    let startValue = document.getElementById("startValue").value;
    let endValue = document.getElementById("endValue").value;

    //parseInt is used to convert a string number to a number number
    let newStart = parseInt(startValue);
    let newEnd = parseInt(endValue);

    //create a Boolean variable to check for an error state
    //we start with false so that it does not trigger
    let errorState = false;
    //create an empty string that will store any error messages generated
    let errorMsg = "";

    //make sure the user entered 2 numbers
    //isNaN is a built in JS function that returns true if the variable is 'not a number'
    if (isNaN(newStart) || isNaN(newEnd)) {
        //change errorState to true
        errorState = true;
        //add a specific error message to the empty string
        errorMsg += "Please use numbers<hr/>";
    }

    //make sure that the start value is less than the end value
    if (newStart > newEnd) {
        //change errorState to true
        errorState = true;
        //add a specific error message to the empty string
        errorMsg += "Start value must be less than end value<hr/>";
    }

    //Set an upper and lower bound for the loops
    //This is an optional addition that improves the user experience
    if (newStart > 10000 || newStart < -10000 || newEnd > 10000 || newEnd < -10000) {
        //change errorState to true
        errorState = true;
        //add a specific error message to the empty string
        errorMsg += "-10,000 and 10,000 are the limit<hr/>";
    }

    //if any of the error cases happened fire a SweetAlert and exit the function
    if (errorState) {
        Swal.fire(
            'Something went wrong',
            `${errorMsg}`,
            'error'
        );
        return;
    }
    //take the start and end values as the bounds for a 'for' loop
    //that will create an array and return it
    let numbers = generateNumbers(newStart, newEnd);

    //take the array that was returned and pass it to a function that will
    //display it
    displayNumbers(numbers);
}

//Wrapper function/method - a function that calls other functions

function generateNumbers(startValue, endValue) {
    let numbers = [];

    //loop over every number from startValue to endValue
    for (let index = startValue; index <= endValue; index++) {
        numbers.push(index);
    }

    //send the array of numbers back to the wrapper function
    return numbers;
}


//this function exists to display the results to the user
function displayNumbers(fluffyKitty) {
    //create a string to hold a class name based on even or odd
    let className = "even";
    //create a string that will hold our output
    let templateRows = "";

    //go through each number in the array and determine if that number is even or odd
    //the '%' modulus operand returns the remainder from division
    //ex. 3 % 2 = 1
    //ex. 100 % 5 = 0
    for (let index = 0; index < fluffyKitty.length; index++) {
        let number = fluffyKitty[index];

        if (number % 2 == 0) {
            className = "even";
        } else {
            className = "odd";
        }

        //use string concatenation to create a long string of HTML to display
        templateRows = templateRows + `<tr><td class="${className}">${number}</td></tr>`;
    }

    document.getElementById("output").innerHTML = templateRows;
}