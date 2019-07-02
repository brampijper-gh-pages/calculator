const buttons = document.querySelectorAll('button');
const buttonsArr = Array.from(buttons);
let numArr = [];

const container = document.querySelector('#calculator-display');
const feedbackMsg = document.querySelector('#feedback-message');

const paragraph = document.createElement('p');
paragraph.classList.add('content');

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
            numArr.push(val); 
            paragraph.textContent += `${val}`;
            showUserFeedback('');
            break;

        case "+": case "-": case "*": case "/":
            if(isLastEntryAnInteger(numArr)) {
                numArr.push(val);
                paragraph.textContent += `${val}`;
                showUserFeedback('');
            } 
            else showUserFeedback('You cannot place multiple operators after each other!');
            break;

        case "=": case "Enter":
            if(numArr.length == 0) {
                showUserFeedback('Please input a number first'); 
            }
            else if(!isLastEntryAnInteger(numArr)) {
                showUserFeedback('You cannot end with an operator!');
            }
            else if (!hasOperator(numArr)) {
                showUserFeedback('You need to add an operator!');
            }
            else {
                paragraph.textContent += "=";
                calculateString(numArr)
                showUserFeedback('')
            }
            break;

        case "clear": case "Delete":
            numArr.length = 0;
            paragraph.textContent = '';
            showUserFeedback('')
            break;

        case "Backspace":
            if (numArr.length) numArr.pop()
            paragraph.textContent = `${numArr.join('')}`;
            showUserFeedback('')
            break;

        case ".":
            if(numArr.length && isLastEntryAnInteger(numArr)) {
                numArr.push('.');
                paragraph.textContent += `${val}`;
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
    return numArr.some(function (item) {
        return item == '+' || item == '-' || item == '/' || item == '*'
    })
}

function isLastEntryAnInteger(numArr) {
    if(parseInt(numArr[numArr.length-1]) == 0 && numArr[numArr.length-2] == '/') {
        return false + showUserFeedback('Dividing by 0 is impossible'); 
    } else if (parseInt(numArr[numArr.length-1]) == 0) {
        return true;
    } else return parseInt(numArr[numArr.length-1]);
}

function calculateString(numArr) {
    myString = numArr.join(''); 
    let total = new Function('return ' + myString)();
    paragraph.textContent += `${total =+ total.toFixed(2)}`; 
}