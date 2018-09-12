let i: number = 0;
let running: boolean = false;
let characters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
let alphabets: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
let capitals: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let lowercase: string = "abcdefghijklmnopqrstuvwxyz";

function typeWriterAdd(element: HTMLElement, string: string, speed: number): void{
    i = 0;
    addText(element,string,speed);

}

function typeWriterDelete(element: HTMLElement, places: number, speed: number): void{
    i = 0;
    deleteText(element,places,speed);
}


function addText(element: HTMLElement, string: string, speed: number): void{
        if(i < string.length){
            element.innerHTML += string.charAt(i);
            i++;
            setTimeout(function(): void{addText(element,string,speed)}, speed);
        }else{
            i = 0;
        }
}
function deleteText(element: HTMLElement, places: number, speed: number) :void{
    let arr: string[] = stringToArray(element.innerHTML);
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
    element.innerHTML = stringArray[i];
    setTimeout(function(): void{changeTextThenStop(element,stringArray,speed)}, speed);
}

function changeText(element: HTMLElement, stringArray: string[], speed: number): void{
    if(i != stringArray.length - 1){
        i++;
    }else{
        i = 0;
    }
    element.innerHTML = stringArray[i];
    setTimeout(function(): void{changeText(element,stringArray,speed)}, speed);
}

function randText(numberOfCharacters: number, targetString: string): string{
    
    let randomString : string = "";
    for(let i = 0; i < numberOfCharacters ; i++){
        randomString += targetString.charAt(Math.floor(Math.random() * targetString.length))
    }
    return randomString;
}

function randCharText(numberOfCharacters: number): string{
    return randText(numberOfCharacters,characters);
}

function randAlphaText(numberOfCharacters: number): string{
    return randText(numberOfCharacters,alphabets);
}

function randCapitalText(numberOfCharacters: number): string{
    return randText(numberOfCharacters,capitals);
}

function randLowerText(numberOfCharacters: number): string{
    return randText(numberOfCharacters,lowercase);
}

function stringToArray(string: string){
    let array: string[] = [];
	for(let i = 0; i < string.length; i++){
		array.push(string.charAt(i));
	}
	return array;
}
function arrayToString(arr: string[]){
	let string = "";
	string = arr.join("");
	return string;
}