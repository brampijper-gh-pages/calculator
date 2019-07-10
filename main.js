const buttons = document.querySelectorAll('button');
const buttonsArr = Array.from(buttons);
let myCalculation = '';
let myNum = '';

const container = document.querySelector('#calculator-display');
const feedbackMsg = document.querySelector('#feedback-message');
const historyMsg = document.querySelector('#history-message');

const decimalBtn = document.querySelector("#decimal");

const paragraph = document.createElement('p');
const historyP = document.createElement('p');
paragraph.classList.add('content');
historyP.classList.add('content');
container.append(paragraph, historyP);

document.addEventListener('keydown', (event) => {
    useInputValue(event.key);
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
            myNum += val;
            myCalculation += val;
            paragraph.textContent = myCalculation;
            showUserFeedback('');
            break;

        case "+": case "-": case "*": case "/":

        // check if last number is integer, if so add operator
            if(isLastEntryAnInteger(myCalculation)) {
                myNum = '';
                calculateString(myCalculation);
                myCalculation += val;
                historyP.textContent = myCalculation;
                container.append(historyP);
                decimalBtn.disabled = false;
                showUserFeedback('');
            } 
            else showUserFeedback('You cannot place multiple operators after each other!');
            break;

        case "=": case "Enter":
            if(myCalculation ==  '') {
                showUserFeedback('Please input a number first'); 
            }
            else if(!isLastEntryAnInteger(myCalculation)) {
            }
            else if (!hasOperator(myCalculation)) {
                showUserFeedback('You need to add an operator!');
            }
            else {
                historyP.textContent = '';
                calculateString(myCalculation)
                myCalculation = calculateString(myCalculation).toString();
                showUserFeedback('')
            }
            break;

        case "clear": case "Delete":
            myCalculation = historyP.textContent = paragraph.textContent = '';
            decimalBtn.disabled = false;
            showUserFeedback('')
            break;
 
        case "Backspace":
            myCalculation = myCalculation.substring(0, myCalculation.length-1)
            myNum = myNum.substring(0, myNum.length-1)


            historyP.textContent = myCalculation;
            paragraph.textContent = myCalculation;
            decimalBtn.disabled = false;
            showUserFeedback('')
            break;

        case ".":
            if(myCalculation.length && isLastEntryAnInteger(myCalculation)) {
                if(!alreadyHasDecimal(myNum)) {
                    myCalculation += val; 
                    myNum += val;
                    paragraph.textContent = myCalculation;
                    container.append(paragraph)
                    decimalBtn.disabled = true;
                    showUserFeedback('')
                } else showUserFeedback('cannot add decimal!');

            }
            else {
                showUserFeedback('cannot add decimal!')
            }
            break;
        default:
            break;
    }
}

function alreadyHasDecimal(myString) {
    const decimalArr = ['.'];
    let test = 0;
    decimalArr.forEach(function(decimal) {
        if(myString.includes(decimal)) {
            test = 1; 
        }
    })
    return test;
}

function showUserFeedback(msg) {
    feedbackMsg.textContent = msg;
}

function hasOperator(numArr) {
    const operatorArr = ['+', '-', '/', '*'];
    let myNum = 0;
    operatorArr.forEach(function(word){
        if (numArr.includes(word)) {
            myNum = 1; 
        }
    })
    return myNum
}

function isLastEntryAnInteger(myCalc) {

    if (myCalc === '') {
        return false + showUserFeedback('Please add a number first');
    }
    else if (myCalc.endsWith('/') || myCalc.endsWith('*') || myCalc.endsWith('-') || myCalc.endsWith('+')) {
        return false + showUserFeedback('You cannot end with an operator!');
    }

    else if(myCalc.endsWith('0') && myCalc.charAt(myCalc.length - 2) == '/') {
        return false + showUserFeedback('Dividing by 0 is impossible'); 
    }

    else if(myCalc.endsWith('.')) {
        return false;
    }
    
    else return true;
}

function calculateString(numArr) {
    let total = new Function('return ' + numArr)();
    paragraph.textContent = `${total =+ total.toFixed(2)}`;
    return total; 
}