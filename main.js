const buttons = document.querySelectorAll('button');
const buttonsArr = Array.from(buttons);
let numArr = [];

const container = document.querySelector('#calculator-display');
const paragraph = document.createElement('p');
paragraph.classList.add('content');

buttonsArr.forEach(button => {
    button.addEventListener('click', (e) => {
        let val = e.target.value;
        switch(val) {
            case "0": case "1": case "2": case "3": case "4": case "5": case "6": case "7": case "8": case "9":
                numArr.push(val); 
                paragraph.textContent += `${val}`;
                break;
            case "+": case "-": case "*": case "/":
                numArr.push(val);
                paragraph.textContent += `${val}`;
                break;
            case "=":
                paragraph.textContent += `${val} `;
                calculateString(numArr)
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

function calculateString(numArr) {
    myString = numArr.join(''); 
    let total = new Function('return ' + myString)();
    paragraph.textContent += `${total}`; 

}