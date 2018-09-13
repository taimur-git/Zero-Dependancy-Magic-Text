var i = 0;
var running = false;
var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
var alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
var capitals = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var lowercase = "abcdefghijklmnopqrstuvwxyz";
var currentSpeed = 0;
var previousElement;
var UniversalSpeed = 200;
function defaultJumble(element) {
    jumbleCharacters(element, returnNonNullTextContent(element.textContent), 10, UniversalSpeed);
}
function defaultAdd(element, string) {
    typeWriterAdd(element, string, UniversalSpeed);
}
function defaultDelete(element, places) {
    typeWriterDelete(element, places, UniversalSpeed);
}
function typeWriterAdd(element, string, speed) {
    i = 0;
    setTimeout(function () { addText(element, string, speed); }, currentSpeed);
    //if(previousElement===element || previousElement===undefined){
    currentSpeed += calculateSpeedString(string, speed);
    //}else{
    //    currentSpeed = 0;
    //}
    //previousElement = element;
}
function typeWriterDelete(element, places, speed) {
    i = 0;
    setTimeout(function () { deleteText(element, places, speed); }, currentSpeed);
    //if(previousElement===element || previousElement===undefined){
    currentSpeed += calculateSpeed(places, speed);
    //}else{
    //    currentSpeed = 0;
    //}
    //previousElement = element;
}
function addText(element, string, speed) {
    var arr = stringToArray(returnNonNullTextContent(element.textContent));
    var stringArray = [];
    for (var i_1 = 0; i_1 < string.length; i_1++) {
        arr.push(stringToArray(string)[i_1]);
        stringArray.push(arrayToString(arr));
    }
    i = 0;
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
    if (i != stringArray.length - 1) {
        i++;
    }
    else {
        i = 0;
        return;
    }
    element.textContent = stringArray[i];
    setTimeout(function () { changeTextThenStop(element, stringArray, speed); }, speed);
}
function changeText(element, stringArray, speed) {
    if (i != stringArray.length - 1) {
        i++;
    }
    else {
        i = 0;
    }
    element.textContent = stringArray[i];
    setTimeout(function () { changeText(element, stringArray, speed); }, speed);
}
function jumbleCharacters(element, string, timesJumbled, speed) {
    jumbleStringFunction(element, string, timesJumbled, speed, function () { return randCharText(string.length); });
}
function jumbleStringFunction(element, string, timesJumbled, speed, jumbleFunction) {
    if (i < timesJumbled) {
        element.textContent = jumbleFunction(string.length);
        i++;
    }
    else {
        element.textContent = string;
        return;
    }
    setTimeout(function () { jumbleStringFunction(element, string, timesJumbled, speed, jumbleFunction); }, speed);
}
function randText(numberOfCharacters, targetString) {
    var randomString = "";
    for (var i_3 = 0; i_3 < numberOfCharacters; i_3++) {
        randomString += targetString.charAt(Math.floor(Math.random() * targetString.length));
    }
    return randomString;
}
function randCharText(numberOfCharacters) {
    return randText(numberOfCharacters, characters);
}
function randAlphaText(numberOfCharacters) {
    return randText(numberOfCharacters, alphabets);
}
function randCapitalText(numberOfCharacters) {
    return randText(numberOfCharacters, capitals);
}
function randLowerText(numberOfCharacters) {
    return randText(numberOfCharacters, lowercase);
}
function stringToArray(string) {
    var array = [];
    for (var i_4 = 0; i_4 < string.length; i_4++) {
        array.push(string.charAt(i_4));
    }
    return array;
}
function arrayToString(arr) {
    var string = "";
    string = arr.join("");
    return string;
}
function calculateSpeed(places, speed) {
    var functionSpeed = places * speed;
    return functionSpeed;
}
function calculateSpeedString(string, speed) {
    return calculateSpeed(string.length, speed);
}
function returnNonNullTextContent(textContent) {
    if (textContent === null) {
        return "";
    }
    else {
        return textContent;
    }
}
/*
function addText(element: HTMLElement, string: string, speed: number): void{
        if(i < string.length){
            element.innerHTML += string.charAt(i);
            i++;
            setTimeout(function(): void{addText(element,string,speed)}, speed);
        }else{
            i = 0;
        }
}
*/ 
