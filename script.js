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
            if (checkInputForZero()) {
                setNewInputValue(currentValue);
            } else {
                inputValuePush(currentValue);
            }

            calculatorObject.operand = +getCurrentInputValue();
            break;
        
        // handle extra btns ('.', '+/-')
        case currentValue === '.':
            inputValuePush(currentValue);
            break;
        case currentValue === 'changeSign':
            if (!checkInputForZero()) {
                changeInputSign();
                calculatorObject.operand = +getCurrentInputValue();
            }
            break;
        
        // handle AC
        case currentValue === 'AC':
            resetAll();
            break;
        
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

function getCurrentInputValue() {
    const inputField = document.querySelector('#result-field');
    return inputField.value;
}

function setNewInputValue(value) {
    const inputField = document.querySelector('#result-field');
    inputField.value = value;
}

function inputValuePush(value) {
    const inputField = document.querySelector('#result-field');
    inputField.value += value;
}

function inputValueUnshift(value) {
    const inputField = document.querySelector('#result-field');
    inputField.value = value + inputField.value;
}

function checkInputForZero() {
    const inputField = document.querySelector('#result-field');
    return inputField.value[0] === '0' && inputField.value.length === 1;
}

function checkInputForFirstZero() {
    const inputField = document.querySelector('#result-field');
    return inputField.value[0] === '0';
}

function changeInputSign() {
    const inputField = document.querySelector('#result-field');
    if (inputField.value[0] === '-') {
        inputField.value = inputField.value.slice(1);
    } else {
        inputField.value = '-' + inputField.value;
    }
}

function resetAll() {
    const inputField = document.querySelector('#result-field');
    inputField.value = '0';
    calculatorObject = new Calculator();
}

/*function mainTests() {
    calculatorObject.operand = 2;
    calculatorObject.operator = '*';
    let res = calculatorObject.calculate(3);
    console.log(res);
}*/

//mainTests();
main();
