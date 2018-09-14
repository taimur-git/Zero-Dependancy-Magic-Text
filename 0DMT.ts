let i: number = 0;
let running: boolean = false;
let currentSpeed: number = 0;
let UniversalSpeed : number = 200;
let previousElement : HTMLElement;
enum jumbleFunctionList{
    randomCharacters,
    randomAlphabets,
    randomCapitals,
    randomLowerCase,
}


function defaultJumble(element: HTMLElement, jumbleVar: jumbleFunctionList = 0): void{
    jumbleCharacters(element,returnNonNullTextContent(element.textContent),10,UniversalSpeed,jumbleVar);
}
function defaultAdd(element: HTMLElement, string: string = "Hello World!"): void{
    typeWriterAdd(element, string, UniversalSpeed);
}
function defaultDelete(element: HTMLElement, places: number = 0): void{
    typeWriterDelete(element, places, UniversalSpeed);
}
function defaultChangeText(element: HTMLElement, stringArray: string[]): void{
    changeText(element, stringArray, UniversalSpeed);
}


function typeWriterAdd(element: HTMLElement, string: string, speed: number): void{
    i = 0;
    setTimeout(function(){addText(element,string,speed)},currentSpeed);
    //if(previousElement===element || previousElement===undefined){
        currentSpeed += calculateSpeedString(string,speed);
    //}else{
    //    currentSpeed = 0;
    //}
    //previousElement = element;
}

function typeWriterDelete(element: HTMLElement, places: number, speed: number): void{
    i = 0;
    setTimeout(function(){deleteText(element,places,speed)},currentSpeed);
    //if(previousElement===element || previousElement===undefined){
        currentSpeed += calculateSpeed(places, speed);
    //}else{
    //    currentSpeed = 0;
    //}
    //previousElement = element;

}
function addText(element: HTMLElement, string: string, speed: number): void{
    let arr: string[] = stringToArray(returnNonNullTextContent(element.textContent));
    let stringArray: string[] = [];
    for(let i = 0; i < string.length ; i++){
        arr.push(stringToArray(string)[i]);
        stringArray.push(arrayToString(arr));
    }
    i = 0;
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
    if(i != stringArray.length - 1){
        i++;
    }else{
        i = 0;
        return;
    }
    element.textContent = stringArray[i];
    setTimeout(function(): void{changeTextThenStop(element,stringArray,speed)}, speed);
}

function changeText(element: HTMLElement, stringArray: string[], speed: number): void{
    if(i != stringArray.length - 1){
        i++;
    }else{
        i = 0;
    }
    element.textContent = stringArray[i];
    setTimeout(function(): void{changeText(element,stringArray,speed)}, speed);
}


function jumbleCharacters(element: HTMLElement,string: string,timesJumbled: number, speed: number, randCharGen : jumbleFunctionList): void{   
    jumbleStringFunction(element,string,timesJumbled,speed,function(): string{ return randTextGen(string.length, randCharGen)});
}
function jumbleStringFunction(element: HTMLElement,string: string, timesJumbled: number, speed: number, jumbleFunction: (n: number) => string): void{
    if(i < timesJumbled){
        element.textContent = jumbleFunction(string.length);
        i++;
    }
    else{
        i = 0;
        element.textContent = string;
        return;
    }
    setTimeout(function(): void{jumbleStringFunction(element,string,timesJumbled,speed,jumbleFunction)},speed);
}
function randText(numberOfCharacters: number, targetString: string): string{   
    let randomString : string = "";
    for(let i = 0; i < numberOfCharacters ; i++){
        randomString += targetString.charAt(Math.floor(Math.random() * targetString.length))
    }
    return randomString;
}

function randTextGen(numberOfCharacters: number, randCharGen: jumbleFunctionList): string{
    let characters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let alphabets: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let capitals: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let lowercase: string = "abcdefghijklmnopqrstuvwxyz";
    switch(randCharGen){
        case 1:
            return randText(numberOfCharacters,alphabets);
            break;
        case 2:
            return randText(numberOfCharacters,capitals);
            break;
        case 3:
            return randText(numberOfCharacters,lowercase);
            break;
        default:
            return randText(numberOfCharacters,characters);
    }
}
function stringToArray(string: string): string[]{
    let array: string[] = [];
	for(let i = 0; i < string.length; i++){
		array.push(string.charAt(i));
	}
	return array;
}
function arrayToString(arr: string[]): string{
	let string = "";
	string = arr.join("");
	return string;
}

function calculateSpeed(places: number, speed: number): number{
    let functionSpeed: number = places * speed;
    return functionSpeed;
}

function calculateSpeedString(string : string, speed: number): number{
    return calculateSpeed(string.length,speed);
}

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