let calculatorObject = new Calculator();

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operand, operator, currentRes) {
    let newResult;
    switch (operator) {
        case '+':
            newResult = add(operand, currentRes);
            break;
        case '-':
            newResult = subtract(operand, currentRes);
            break;
        case '*':
            newResult = multiply(operand, currentRes);
            break;
        case '/':
            newResult = divide(operand, currentRes);
    }

    return newResult;
}

function Calculator() {
    this.currentRes = 0;
    this.operand = null;
    this.operator = null;
    
    this.getNewCurrentRes = enteredValue => {
        return operate(this.operand, this.operator, this.currentRes);
    };

    this.setNewCurrentRes = currentRes => this.currentRes = currentRes;
    this.setNewOperand = operand => this.operand = operand;
}

function main() {
    setEventListenersForButtons();
}

function setEventListenersForButtons() {
    const btnList = document.querySelectorAll('.btn');
    btnList.forEach(btn => btn.addEventListener('click', e => {
        handleBtnClick(e);
    }));
}

function handleBtnClick(e) {
    const currentBtn = e.target;
    const currentValue = currentBtn.value;

    switch(true) {
        // handle numbers
        case '0' <= currentValue && currentValue <= '9':
            // handle
            break;
        
        // handle extra btns ('.', '+/-')
        case currentValue === '.':
        case currentValue === 'changeSign':
        
        // handle AC
        case currentValue === '':
        
        // handle signs
        case currentValue === '/':
        case currentValue === '*':
        case currentValue === '-':
        case currentValue === '+':
        case currentValue === 'sqrt':
        case currentValue === '%':

        // handle =
        case currentValue === '=':
        
        // for tests...
        default:
            //alert('oo');
    }
}

function setNewInputValue(value) {
    const inputField = document.querySelector('#result-field');
    inputField.textContent = value;
}

function inputValuePush(value) {
    const inputField = document.querySelector('#result-field');
    inputField.textContent += value;
}

function inputValueUnshift(value) {
    const inputField = document.querySelector('#result-field');
    inputField.textContent = value + inputField.textContent;
}

/*function mainTests() {
    calculatorObject.operand = 2;
    calculatorObject.operator = '*';
    let res = calculatorObject.calculate(3);
    console.log(res);
}*/

//mainTests();
main();
