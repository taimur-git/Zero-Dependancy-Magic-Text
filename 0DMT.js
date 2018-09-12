var i = 0;
var running = false;
var randomCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
var randomAlphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
var randomCapitals = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var randomLowercase = "abcdefghijklmnopqrstuvwxyz";
function typeWriterAdd(element, string, speed) {
    i = 0;
    addText(element, string, speed);
}
function typeWriterDelete(element, places, speed) {
    i = 0;
    deleteText(element, places, speed);
}
function addText(element, string, speed) {
    if (i < string.length) {
        element.innerHTML += string.charAt(i);
        i++;
        setTimeout(function () { addText(element, string, speed); }, speed);
    }
    else {
        i = 0;
    }
}
function deleteText(element, places, speed) {
    var arr = stringToArray(element.innerHTML);
    var stringArray = [];
    for (var i_1 = 0; i_1 < places; i_1++) {
        arr.pop();
        stringArray.push(arrayToString(arr));
    }
    i = 0;
    changeTextThenStop(element, stringArray, speed);
}
function changeTextThenStop(element, stringArray, speed) {
    if (i != stringArray.length - 1) {
        i++;
    }
    else {
        i = 0;
        return;
    }
    element.innerHTML = stringArray[i];
    setTimeout(function () { changeTextThenStop(element, stringArray, speed); }, speed);
}
function changeText(element, stringArray, speed) {
    if (i != stringArray.length - 1) {
        i++;
    }
    else {
        i = 0;
    }
    element.innerHTML = stringArray[i];
    setTimeout(function () { changeText(element, stringArray, speed); }, speed);
}
function randText(numberOfCharacters, targetString) {
    var randomString = "";
    for (var i_2 = 0; i_2 < numberOfCharacters; i_2++) {
        randomString += targetString.charAt(Math.floor(Math.random() * targetString.length));
    }
    return randomString;
}
function randCharText(numberOfCharacters) {
    return randText(numberOfCharacters, randomCharacters);
}
function randAlphaText(numberOfCharacters) {
    return randText(numberOfCharacters, randomAlphabets);
}
function randCapitalText(numberOfCharacters) {
    return randText(numberOfCharacters, randomCapitals);
}
function randLowerText(numberOfCharacters) {
    return randText(numberOfCharacters, randomLowercase);
}
function stringToArray(string) {
    var array = [];
    for (var i_3 = 0; i_3 < string.length; i_3++) {
        array.push(string.charAt(i_3));
    }
    return array;
}
function arrayToString(arr) {
    var string = "";
    string = arr.join("");
    return string;
}
