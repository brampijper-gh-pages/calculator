const buttons = document.querySelectorAll('button');
const buttonsArr = Array.from(buttons);
let numArr = [];
let value; 

const container = document.querySelector('#calculator-display');
const paragraph = document.createElement('p');
paragraph.classList.add('content');

document.addEventListener('keydown', (event) => {
    useInputValue(event.key);
    console.log(event.key);5
    container.append(paragraph);
})

buttonsArr.forEach(button => {
    button.addEventListener('click', (e) => {
        useInputValue(e.target.value);
        container.append(paragraph);
    })
});

function useInputValue(val) {

    switch(val) {
        case "0": case "1": case "2": case "3": case "4": case "5": case "6": case "7": case "8": case "9":
            numArr.push(val); 
            paragraph.textContent += `${val}`;
            break;

        case "+": case "-": case "*": case "/":
            if(isLastEntryAnInteger(numArr)) {
                numArr.push(val);
                paragraph.textContent += `${val}`
            } else console.log('You cannot place multiple operators after each other!');
            break;

        case "=": case "Enter":
            if(numArr.length == 0) {
                console.log('Please input a number first'); 
            } else if(!isLastEntryAnInteger(numArr)) {
                console.log('You cannot end with an operator!');
            } else if (!hasOperator(numArr)) {
                console.log('You need to add an operator!');
            } else {
                paragraph.textContent += "=";
                calculateString(numArr)
            }
            break;

        case "clear": case "Delete":
            numArr.length = 0;
            paragraph.textContent = '';
            break;

        case "Backspace":
            if (numArr.length) numArr.pop()
            paragraph.textContent = `${numArr.join('')}`;
            break;

        case ".":
            if(numArr.length && isLastEntryAnInteger(numArr)) {
                numArr.push('.');
                paragraph.textContent += `${val}`;
                console.log(numArr)
            } else {
                console.log('cannot add decimal!')
            }
            break;
        default:
            break;
    }
}

function hasOperator(numArr) {
    return numArr.some(function (item) {
        return item == '+' || item == '-' || item == '/' || item == '*'
    })
}

function isLastEntryAnInteger(numArr) {
    if(parseInt(numArr[numArr.length-1]) == 0 && numArr[numArr.length-2] == '/') {
        return false + console.log('Dividing by 0 is impossible'); 
    } else if (parseInt(numArr[numArr.length-1]) == 0) {
        return true;
    } else return parseInt(numArr[numArr.length-1]);
}

function calculateString(numArr) {
    myString = numArr.join(''); 
    let total = new Function('return ' + myString)();
    paragraph.textContent += `${total =+ total.toFixed(2)}`; 

}