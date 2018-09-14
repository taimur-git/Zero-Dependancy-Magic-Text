//counter
let i: number = 0;
//incremented speed to run code
let currentSpeed: number = 0;
//universal speed that all functions use as the default speed = 200
const UniversalSpeed : number = 200;
//previous element, currently undefined
let previousElement : HTMLElement;
//enum used to jumble text in different ways
enum jumbleFunctionList{
    randomCharacters,
    randomAlphabets,
    randomCapitals,
    randomLowerCase,
}

//default functions that are easier to call//



//jumbles a selected element 10 times at the speed of 200 milliseconds with a selected jumblefunction
function defaultJumble(element: HTMLElement = previousElement, timesJumbled: number = 10, jumbleVar: jumbleFunctionList = 0): void{
    jumbleCharacters(element,returnNonNullTextContent(element.textContent),timesJumbled,UniversalSpeed,jumbleVar);
}
//jumbles a selected element 10 times at the speed of 200 milliseconds with by jumbling same type of elements with same types of elements
function defaultSmartJumble(element: HTMLElement = previousElement, timesJumbled: number = 10){
    smartJumble(element, timesJumbled, UniversalSpeed);
}
//adds a string to a selected element at the speed of 200 milliseconds with default text of "Hello World!"
function defaultAdd(element: HTMLElement = previousElement, string: string = "Hello World!"): void{
    typeWriterAdd(element, string, UniversalSpeed);
}
//deletes a string of a selected element at the speed of 200 milliseconds at *places* amount of places, default being it deletes the entire string
function defaultDelete(element: HTMLElement = previousElement, places: number = returnNonNullTextContent(element.textContent).length): void{
    typeWriterDelete(element, places, UniversalSpeed);
}
//changes the entire string of a selected element with an array at the speed of 200 milliseconds, default being Hello and Goodbye
function defaultChangeText(element: HTMLElement = previousElement, stringArray: string[] = ["Hello!","Goodbye!"]): void{
    changeText(element, stringArray, UniversalSpeed);
}


//adds text to a string in an HMTLElement
function typeWriterAdd(element: HTMLElement, string: string, speed: number): void{
    //calls typeWriter to pass in parameters from parent function
    //and then use two anonymous functions that run parent functions' respective functions
    //(needlessly verbose but thats how it is)
    typeWriter(element,string,speed,function(){
        return calculateSpeedString(string, speed);
    },function(){
        addText(element,string,speed);
    })
}

//deletes text from a string in an HTMLElement
function typeWriterDelete(element: HTMLElement, places: number, speed: number): void{
    //calls typeWriter to pass in parameters from parent function
    //and then use two anonymous functions that run parent functions' respective functions
    //(needlessly verbose but thats how it is)
    typeWriter(element,places,speed,function(){
        return calculateSpeed(places, speed);
    },function(){
        deleteText(element,places,speed);
    })
}

//typeWriter function that both typeWriterDelete and typeWriterAdd can call due to them being the same function but with different parameters and functions inside
function typeWriter(element: HTMLElement, passingValue: number | string, speed: number, speedCalculator: (p: number | string, speed: number) => number, actionFunction: (e: HTMLElement, p: number | string, speed: number) => void): void{
    //sets counter to 0
    i = 0;
    //sets a timeout so it continues after *speed* milliseconds
    setTimeout(function(){actionFunction(element,passingValue,speed)},currentSpeed);
    //checks if parameter element is previous element or not (or if it was never defined meaning first call)
    if(previousElement===element || previousElement===undefined){
        //increments *currentSpeed* meaning it sets a sequence for things to play out so that add and delete don't coincide
        currentSpeed += speedCalculator(passingValue, speed);
    }else{
        //sets currentSpeed to zero so that it can be used from the console without problems
        currentSpeed = 0;
    }
    //sets previous element to current element
    previousElement = element;
}

function addText(element: HTMLElement, string: string, speed: number): void{
    //assigns a string of the HTMLElement text content into array using non null text content
    let arr: string[] = stringToArray(returnNonNullTextContent(element.textContent));
    //sets an empty string array
    let stringArray: string[] = [];
    //until length of string is completed,
    for(let i = 0; i < string.length ; i++){
        //adds a string to the array from parameter string
        arr.push(stringToArray(string)[i]);
        //converts array back into string and adds into another string array
        stringArray.push(arrayToString(arr));
    }
    //sets counter back to 0
    i = 0;
    //passes string array back into change function
    changeTextThenStop(element,stringArray,speed);
}


function deleteText(element: HTMLElement, places: number, speed: number) :void{
    let arr: string[] = stringToArray(returnNonNullTextContent(element.textContent));
    let stringArray: string[] = [];
    for(let i = 0; i < places ; i++){
        arr.pop();
        stringArray.push(arrayToString(arr));
    }
    i = 0;
    changeTextThenStop(element,stringArray,speed);
}

function changeTextThenStop(element: HTMLElement, stringArray: string[], speed: number): void{
    if(i < stringArray.length){
        element.textContent = stringArray[i];
        previousElement = element;
        i++;
        //sets a timeout so it continues after *speed* milliseconds
        setTimeout(function(): void{changeTextThenStop(element,stringArray,speed)}, speed);
    }else{
        i = 0;
        currentSpeed = 0;
        return;
    }
}

//changes the text on a HTMLElement by rotating it through an array
function changeText(element: HTMLElement, stringArray: string[], speed: number): void{
    //checks if it reaches the end of the array of strings
    if(i < stringArray.length){
        //increments the counter
        i++;
    }else{
        //sets counter to zero
        i = 0;
    }
    //sets HTMLElement text content to current array member
    element.textContent = stringArray[i];
    //sets previous element to current element
    previousElement = element;
    //sets a timeout so it continues after *speed* milliseconds
    setTimeout(function(): void{changeText(element,stringArray,speed)}, speed);
}


function smartJumble(element: HTMLElement, timesJumbled: number, speed: number, string: string = returnNonNullTextContent(element.textContent)): void{
    if(i < timesJumbled){
        //element.textContent = "";
        //changes each text content to smart jumble letter.
        element.textContent = smartJumbleString(returnNonNullTextContent(element.textContent));
        //increments the counter
        i++;
    }
    else{
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
    setTimeout(function(): void{smartJumble(element,timesJumbled,speed,string)},speed);
}

function smartJumbleString(string: string): string{
    let arr: string[] = stringToArray(string);
    let returnString = "";
    for(let i = 0 ; i < arr.length ; i++){
        returnString += smartJumbleLetter(arr[i]);
    }
    return returnString;
}

function smartJumbleLetter(character: string): string{
    //adapted from https://stackoverflow.com/questions/1027224/how-can-i-test-if-a-letter-in-a-string-is-uppercase-or-lowercase-using-javascrip
    if(character === " "){
        return " ";
    }else if(character === character.toUpperCase() && character === character.toLowerCase()){
        //jumble number
        return randNumGen();
    }
    else if(character === character.toUpperCase()){
        //jumble capital
        return randTextGen(1,2);
    }
    else if(character === character.toLowerCase()){
        //jumble lowercase
        return randTextGen(1,3);
    }else{
        //any character
        return randTextGen(1,0);
    }
    
}


//takes an enum value to make calling the jumbleString function easier.
function jumbleCharacters(element: HTMLElement,string: string,timesJumbled: number, speed: number, randCharGen : jumbleFunctionList): void{   
    //sets anonymous function to pass over that returns a random text string
    jumbleStringFunction(element,string,timesJumbled,speed,function(): string{ return randTextGen(string.length, randCharGen)});
}

//jumbles up the text using called function
function jumbleStringFunction(element: HTMLElement,string: string, timesJumbled: number, speed: number, jumbleFunction: (n: number) => string): void{
    if(i < timesJumbled){
        //uses a jumblefunction with parameter string.length to jumble the text content of HTMLElement
        element.textContent = jumbleFunction(string.length);
        //increments the counter
        i++;
    }
    else{
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
    setTimeout(function(): void{jumbleStringFunction(element,string,timesJumbled,speed,jumbleFunction)},speed);
}

//random text generator
function randText(numberOfCharacters: number, targetString: string): string{   
    //empty string created
    let randomString : string = "";
    //for loop called to add random characters from targetString to empty string
    for(let i = 0; i < numberOfCharacters ; i++){
        randomString += targetString.charAt(Math.floor(Math.random() * targetString.length))
    }
    //random string is returned
    return randomString;
}

//generates random number and returns it as a string
function randNumGen(): string{
    let randNum = Math.floor(Math.random() * 10);
    let numString: string = randNum.toString();
    return numString;
}

//generates random text based on an enum jumbleFunctionList
function randTextGen(numberOfCharacters: number, randCharGen: jumbleFunctionList): string{
    //strings created to generate different kinds of random characters
    let characters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let alphabets: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let capitals: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let lowercase: string = "abcdefghijklmnopqrstuvwxyz";
    //switch case statement to check which enum is called
    switch(randCharGen){
        case 1://jumbleFunction -> 1 = alphabets
            return randText(numberOfCharacters,alphabets);//random text from all alphabets A-z
            break;
        case 2://jumbleFunction -> 2 = capitals
            return randText(numberOfCharacters,capitals);//random text from all capitals A-Z
            break;
        case 3://jumbleFunction -> 3 = lowercase
            return randText(numberOfCharacters,lowercase);//random text from all lowercase a-z
            break;
        default://jumbleFunction -> 0 = all characters (also default to make things easier)
            return randText(numberOfCharacters,characters);//random text from all characters, A-z & 0-9
    }
}

//converts a string to an array using push(*.charAt())
function stringToArray(string: string): string[]{
    let array: string[] = [];
	for(let i = 0; i < string.length; i++){
		array.push(string.charAt(i));
	}
	return array;
}

//converts an array into a string using join()
function arrayToString(arr: string[]): string{
	let string = "";
	string = arr.join("");
	return string;
}

//calculates the speed taken for a deleteText action by multiplying speed with amount of actions
function calculateSpeed(places: number, speed: number): number{
    let functionSpeed: number = places * speed;
    return functionSpeed;
}

//calculates the speed taken for a addText action. uses calculate speed which works near identically
function calculateSpeedString(string : string, speed: number): number{
    return calculateSpeed(string.length,speed);
}

//returns non empty string.
//Used for near all instances of HTMLElement.textContent because there is a slight chance it might return null.
function returnNonNullTextContent(textContent: string | null): string{
    if(textContent === null){
        return "";
    }else{
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