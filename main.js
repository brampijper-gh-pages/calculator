const buttons = document.querySelectorAll('button');
const buttonsArr = Array.from(buttons);
let numArr = [];
let i = 0;

const container = document.querySelector('#calculator-display');
const paragraph = document.createElement('p');
paragraph.classList.add('content');

buttonsArr.forEach(button => {
    button.addEventListener('click', (e) => {
        let val = e.target.value;
        switch(val) {
            case "0": case "1": case "2": case "3": case "4": case "5": case "6": case "7": case "8": case "9":
                (!numArr[i]) ? numArr[i] = val : numArr[i] += val;
                paragraph.textContent += `${val}`;
                break;
            case "+": case "-": case "*": case "/":
                i += 1; 
                numArr.push(val);
                i += 1; 
                paragraph.textContent += `${val}`;
                break;
            case "=":
                paragraph.textContent += `${val} `;
                operate(numArr)
                break;
            case "clear":
                numArr.length = 0;
                paragraph.textContent = ''; 
            default:
                break;
        }

        container.append(paragraph);
    })
});


function operate(calcArr) {
    console.log(calcArr)

    /*
        Reduce array?
        Array always starts with a number 
        followed by an operator
        followed by a number; 
        So loop trough the array and use the proper operator methods. 
    */
}

function add(num1, num2) {
    return num1 + num2; 
}

function substract(num1, num2) {
    return num1 - num2; 
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide (num1, num2) {
    return num1 * num2;
}