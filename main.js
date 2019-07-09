const buttons = document.querySelectorAll('button');
const buttonsArr = Array.from(buttons);
let myNum = ''; 
let numArr = '';
let myCalculation = '';

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
            paragraph.textContent = myNum;
            showUserFeedback('');
            break;

        case "+": case "-": case "*": case "/":

        // check if last number is integer, if so add operator
            if(isLastEntryAnInteger(myCalculation)) {
                calculateString(myCalculation)
                myNum = '';
                myCalculation += val;
                historyP.textContent = `${myCalculation}`;
                container.append(historyP);
                decimalBtn.disabled = false;
                showUserFeedback('');
            } 
            else showUserFeedback('You cannot place multiple operators after each other!');
            break;

        case "=": case "Enter":
                console.log(hasOperator('this is ', myCalculation))
            if(myCalculation ==  '') {
                showUserFeedback('Please input a number first'); 
            }
            else if(!isLastEntryAnInteger(myCalculation)) {
                showUserFeedback('You cannot end with an operator!');
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
            console.log('Running')
            myNum = '';
            myCalculation = '';
            historyP.textContent = '';
            paragraph.textContent = '';
            showUserFeedback('')
            break;

        case "Backspace":
            myCalculation = myCalculation.substring(0, myCalculation.length-1);
            if(!myCalculation.length) { myNum = ''; }
            paragraph.textContent = `${myCalculation}`;
            showUserFeedback('')
            break;

        case ".":
            if(numArr.length && isLastEntryAnInteger(numArr)) {
                numArr.push('.');
                paragraph.textContent += `${val}`;
                decimalBtn.disabled = true;
                showUserFeedback('')
            }
            else {
                showUserFeedback('cannot add decimal!')
            }
            break;
        default:
            break;
    }
}

function showUserFeedback(msg) {
    feedbackMsg.textContent = msg;
}

function hasOperator(numArr) {
    const operatorArr = ['+', '-', '/', '*'];
    operatorArr.forEach(function(word){
        if (numArr.includes(word)) {
            return true;
        }
        return true;
    })
    return true;
}

function isLastEntryAnInteger(myCalc) {
    console.log(myCalc)
    if(myCalc.endsWith('0') && myCalc.charAt(myCalc.length - 2) == '/') {
        return false + showUserFeedback('Dividing by 0 is impossible'); 
    } else return true;
}

function calculateString(numArr) {
    let total = new Function('return ' + numArr)();
    paragraph.textContent = `${total =+ total.toFixed(2)}`;
    return total; 
}

/*
Make the calculator like the the calc on windows. 
- Show history btn.
- dividing and multiply is not working properly (with chaning calculations)
- its not dividing or multiplying bcause its dividing the last entry of the integers instead of the outcome. 
*/