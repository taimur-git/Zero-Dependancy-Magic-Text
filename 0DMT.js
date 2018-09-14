//counter
var i = 0;
//incremented speed to run code
var currentSpeed = 0;
//universal speed that all functions use as the default speed = 200
var UniversalSpeed = 200;
//previous element, currently undefined
var previousElement;
//enum used to jumble text in different ways
var jumbleFunctionList;
(function (jumbleFunctionList) {
    jumbleFunctionList[jumbleFunctionList["randomCharacters"] = 0] = "randomCharacters";
    jumbleFunctionList[jumbleFunctionList["randomAlphabets"] = 1] = "randomAlphabets";
    jumbleFunctionList[jumbleFunctionList["randomCapitals"] = 2] = "randomCapitals";
    jumbleFunctionList[jumbleFunctionList["randomLowerCase"] = 3] = "randomLowerCase";
})(jumbleFunctionList || (jumbleFunctionList = {}));
//default functions that are easier to call//
//jumbles a selected element 10 times at the speed of 200 milliseconds with a selected jumblefunction
function defaultJumble(element, timesJumbled, jumbleVar) {
    if (element === void 0) { element = previousElement; }
    if (timesJumbled === void 0) { timesJumbled = 10; }
    if (jumbleVar === void 0) { jumbleVar = 0; }
    jumbleCharacters(element, returnNonNullTextContent(element.textContent), timesJumbled, UniversalSpeed, jumbleVar);
}
//jumbles a selected element 10 times at the speed of 200 milliseconds with by jumbling same type of elements with same types of elements
function defaultSmartJumble(element, timesJumbled) {
    if (element === void 0) { element = previousElement; }
    if (timesJumbled === void 0) { timesJumbled = 10; }
    smartJumble(element, timesJumbled, UniversalSpeed);
}
//adds a string to a selected element at the speed of 200 milliseconds with default text of "Hello World!"
function defaultAdd(element, string) {
    if (element === void 0) { element = previousElement; }
    if (string === void 0) { string = "Hello World!"; }
    typeWriterAdd(element, string, UniversalSpeed);
}
//deletes a string of a selected element at the speed of 200 milliseconds at *places* amount of places, default being it deletes the entire string
function defaultDelete(element, places) {
    if (element === void 0) { element = previousElement; }
    if (places === void 0) { places = returnNonNullTextContent(element.textContent).length; }
    typeWriterDelete(element, places, UniversalSpeed);
}
//changes the entire string of a selected element with an array at the speed of 200 milliseconds, default being Hello and Goodbye
function defaultChangeText(element, stringArray) {
    if (element === void 0) { element = previousElement; }
    if (stringArray === void 0) { stringArray = ["Hello!", "Goodbye!"]; }
    changeText(element, stringArray, UniversalSpeed);
}
//adds text to a string in an HMTLElement
function typeWriterAdd(element, string, speed) {
    //calls typeWriter to pass in parameters from parent function
    //and then use two anonymous functions that run parent functions' respective functions
    //(needlessly verbose but thats how it is)
    typeWriter(element, string, speed, function () {
        return calculateSpeedString(string, speed);
    }, function () {
        addText(element, string, speed);
    });
}
//deletes text from a string in an HTMLElement
function typeWriterDelete(element, places, speed) {
    //calls typeWriter to pass in parameters from parent function
    //and then use two anonymous functions that run parent functions' respective functions
    //(needlessly verbose but thats how it is)
    typeWriter(element, places, speed, function () {
        return calculateSpeed(places, speed);
    }, function () {
        deleteText(element, places, speed);
    });
}
//typeWriter function that both typeWriterDelete and typeWriterAdd can call due to them being the same function but with different parameters and functions inside
function typeWriter(element, passingValue, speed, speedCalculator, actionFunction) {
    //sets counter to 0
    i = 0;
    //sets a timeout so it continues after *speed* milliseconds
    setTimeout(function () { actionFunction(element, passingValue, speed); }, currentSpeed);
    //checks if parameter element is previous element or not (or if it was never defined meaning first call)
    if (previousElement === element || previousElement === undefined) {
        //increments *currentSpeed* meaning it sets a sequence for things to play out so that add and delete don't coincide
        currentSpeed += speedCalculator(passingValue, speed);
    }
    else {
        //sets currentSpeed to zero so that it can be used from the console without problems
        currentSpeed = 0;
    }
    //sets previous element to current element
    previousElement = element;
}
function addText(element, string, speed) {
    //assigns a string of the HTMLElement text content into array using non null text content
    var arr = stringToArray(returnNonNullTextContent(element.textContent));
    //sets an empty string array
    var stringArray = [];
    //until length of string is completed,
    for (var i_1 = 0; i_1 < string.length; i_1++) {
        //adds a string to the array from parameter string
        arr.push(stringToArray(string)[i_1]);
        //converts array back into string and adds into another string array
        stringArray.push(arrayToString(arr));
    }
    //sets counter back to 0
    i = 0;
    //passes string array back into change function
    changeTextThenStop(element, stringArray, speed);
}
function deleteText(element, places, speed) {
    var arr = stringToArray(returnNonNullTextContent(element.textContent));
    var stringArray = [];
    for (var i_2 = 0; i_2 < places; i_2++) {
        arr.pop();
        stringArray.push(arrayToString(arr));
    }
    i = 0;
    changeTextThenStop(element, stringArray, speed);
}
function changeTextThenStop(element, stringArray, speed) {
    if (i < stringArray.length) {
        element.textContent = stringArray[i];
        previousElement = element;
        i++;
        //sets a timeout so it continues after *speed* milliseconds
        setTimeout(function () { changeTextThenStop(element, stringArray, speed); }, speed);
    }
    else {
        i = 0;
        currentSpeed = 0;
        return;
    }
}
//changes the text on a HTMLElement by rotating it through an array
function changeText(element, stringArray, speed) {
    //checks if it reaches the end of the array of strings
    if (i < stringArray.length) {
        //increments the counter
        i++;
    }
    else {
        //sets counter to zero
        i = 0;
    }
    //sets HTMLElement text content to current array member
    element.textContent = stringArray[i];
    //sets previous element to current element
    previousElement = element;
    //sets a timeout so it continues after *speed* milliseconds
    setTimeout(function () { changeText(element, stringArray, speed); }, speed);
}
function smartJumble(element, timesJumbled, speed, string) {
    if (string === void 0) { string = returnNonNullTextContent(element.textContent); }
    if (i < timesJumbled) {
        //element.textContent = "";
        //changes each text content to smart jumble letter.
        element.textContent = smartJumbleString(returnNonNullTextContent(element.textContent));
        //increments the counter
        i++;
    }
    else {
        //finishes the loop, resets the counter if function is called again.
        i = 0;
        //unjumbles the HTMLElement
        element.textContent = string;
        //sets previous element as current element
        previousElement = element;
        //ends function to escape
        return;
    }
    //sets a timeout so it continues after *speed* milliseconds
    setTimeout(function () { smartJumble(element, timesJumbled, speed, string); }, speed);
}
function smartJumbleString(string) {
    var arr = stringToArray(string);
    var returnString = "";
    for (var i_3 = 0; i_3 < arr.length; i_3++) {
        returnString += smartJumbleLetter(arr[i_3]);
    }
    return returnString;
}
function smartJumbleLetter(character) {
    //adapted from https://stackoverflow.com/questions/1027224/how-can-i-test-if-a-letter-in-a-string-is-uppercase-or-lowercase-using-javascrip
    if (character === " ") {
        return " ";
    }
    else if (character === character.toUpperCase() && character === character.toLowerCase()) {
        //jumble number
        return randNumGen();
    }
    else if (character === character.toUpperCase()) {
        //jumble capital
        return randTextGen(1, 2);
    }
    else if (character === character.toLowerCase()) {
        //jumble lowercase
        return randTextGen(1, 3);
    }
    else {
        //any character
        return randTextGen(1, 0);
    }
}
//takes an enum value to make calling the jumbleString function easier.
function jumbleCharacters(element, string, timesJumbled, speed, randCharGen) {
    //sets anonymous function to pass over that returns a random text string
    jumbleStringFunction(element, string, timesJumbled, speed, function () { return randTextGen(string.length, randCharGen); });
}
//jumbles up the text using called function
function jumbleStringFunction(element, string, timesJumbled, speed, jumbleFunction) {
    if (i < timesJumbled) {
        //uses a jumblefunction with parameter string.length to jumble the text content of HTMLElement
        element.textContent = jumbleFunction(string.length);
        //increments the counter
        i++;
    }
    else {
        //finishes the loop, resets the counter if function is called again.
        i = 0;
        //unjumbles the HTMLElement
        element.textContent = string;
        //sets previous element as current element
        previousElement = element;
        //ends function to escape
        return;
    }
    //sets a timeout so it continues after *speed* milliseconds
    setTimeout(function () { jumbleStringFunction(element, string, timesJumbled, speed, jumbleFunction); }, speed);
}
//random text generator
function randText(numberOfCharacters, targetString) {
    //empty string created
    var randomString = "";
    //for loop called to add random characters from targetString to empty string
    for (var i_4 = 0; i_4 < numberOfCharacters; i_4++) {
        randomString += targetString.charAt(Math.floor(Math.random() * targetString.length));
    }
    //random string is returned
    return randomString;
}
//generates random number and returns it as a string
function randNumGen() {
    var randNum = Math.floor(Math.random() * 10);
    var numString = randNum.toString();
    return numString;
}
//generates random text based on an enum jumbleFunctionList
function randTextGen(numberOfCharacters, randCharGen) {
    //strings created to generate different kinds of random characters
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var capitals = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var lowercase = "abcdefghijklmnopqrstuvwxyz";
    //switch case statement to check which enum is called
    switch (randCharGen) {
        case 1: //jumbleFunction -> 1 = alphabets
            return randText(numberOfCharacters, alphabets); //random text from all alphabets A-z
            break;
        case 2: //jumbleFunction -> 2 = capitals
            return randText(numberOfCharacters, capitals); //random text from all capitals A-Z
            break;
        case 3: //jumbleFunction -> 3 = lowercase
            return randText(numberOfCharacters, lowercase); //random text from all lowercase a-z
            break;
        default: //jumbleFunction -> 0 = all characters (also default to make things easier)
            return randText(numberOfCharacters, characters); //random text from all characters, A-z & 0-9
    }
}
//converts a string to an array using push(*.charAt())
function stringToArray(string) {
    var array = [];
    for (var i_5 = 0; i_5 < string.length; i_5++) {
        array.push(string.charAt(i_5));
    }
    return array;
}
//converts an array into a string using join()
function arrayToString(arr) {
    var string = "";
    string = arr.join("");
    return string;
}
//calculates the speed taken for a deleteText action by multiplying speed with amount of actions
function calculateSpeed(places, speed) {
    var functionSpeed = places * speed;
    return functionSpeed;
}
//calculates the speed taken for a addText action. uses calculate speed which works near identically
function calculateSpeedString(string, speed) {
    return calculateSpeed(string.length, speed);
}
//returns non empty string.
//Used for near all instances of HTMLElement.textContent because there is a slight chance it might return null.
function returnNonNullTextContent(textContent) {
    if (textContent === null) {
        return "";
    }
    else {
        return textContent;
    }
}
