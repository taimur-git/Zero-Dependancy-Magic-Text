var i = 0;
var running = false;
var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
var alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
var capitals = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var lowercase = "abcdefghijklmnopqrstuvwxyz";
var currentSpeed = 0;
function typeWriterAdd(element, string, speed) {
    i = 0;
    setTimeout(function () { addText(element, string, speed); }, currentSpeed);
    currentSpeed = calculateSpeedString(string, speed);
}
function typeWriterDelete(element, places, speed) {
    i = 0;
    setTimeout(function () { deleteText(element, places, speed); }, currentSpeed);
    currentSpeed = calculateSpeed(places, speed);
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
function addText(element, string, speed) {
    var arr = stringToArray(element.innerHTML);
    var stringArray = [];
    for (var i_1 = 0; i_1 < string.length; i_1++) {
        arr.push(stringToArray(string)[i_1]);
        stringArray.push(arrayToString(arr));
    }
    i = 0;
    //console.log(stringArray);
    changeTextThenStop(element, stringArray, speed);
}
function deleteText(element, places, speed) {
    var arr = stringToArray(element.innerHTML);
    var stringArray = [];
    for (var i_2 = 0; i_2 < places; i_2++) {
        arr.pop();
        stringArray.push(arrayToString(arr));
    }
    i = 0;
    //console.log(stringArray);
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
