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
            newResult = subtract(currentRes, operand);
            break;
        case '*':
            newResult = multiply(operand, currentRes);
            break;
        case '/':
            newResult = divide(currentRes, operand);
            break;
        case 'sqrt':
            newResult = Math.sqrt(currentRes);
    }

    return newResult;
}

function Calculator() {
    this.currentRes = 0;
    this.operand = 0;
    this.operator = '';

    this.calculatedInput = false; // calculatedInput is true if it's result of calculations, false if it's user input
    
    this.calcNewCurrentRes = () => {
        return operate(this.operand, this.operator, this.currentRes);
    };
    this.getCurrentRes = () => this.currentRes;
    this.getOperand = () => this.operand;
    this.getOperator = () => this.operator;
    this.getCalculatedInputFlag = () => this.calculatedInput;

    this.setNewCurrentRes = currentRes => this.currentRes = currentRes;
    this.setNewOperand = operand => this.operand = operand;
    this.setNewOperator = operator => this.operator = operator;
    this.setCalculatedInputValueFlag = value => this.calculatedInput = value;
    this.toggleCalculatedInputFlag = () => {
        this.calculatedInput = !this.calculatedInput;
    };
}

function main() {
    setEventListenersForButtons();
    setEventListenersForKeyboardPress();
}

function setEventListenersForButtons() {
    const btnList = document.querySelectorAll('.btn');
    btnList.forEach(btn => btn.addEventListener('click', e => {
        handleBtnClick(e);
        e.target.blur();
    }));
}

function setEventListenersForKeyboardPress() {
    window.addEventListener('keydown', e => {
        handleKeyboardPress(e);
    });

    window.addEventListener('keyup', e => {
        handleKeyboardPress(e);
    });
}

function handleKeyboardPress(e) {
    const pressedBtn = document.querySelector(`.btn[data-key="${e.key}"]`);

    if (!pressedBtn) return;

    if (e.type === 'keydown') {
        pressedBtn.classList.add('btn-active');
        pressedBtn.click();
    } else {
        pressedBtn.classList.remove('btn-active');
    }
}

function handleBtnClick(e) {
    const currentBtn = e.target;
    const currentValue = currentBtn.value;

    switch(true) {
        // handle numbers
        case '0' <= currentValue && currentValue <= '9':
            handleNumberInput(currentValue);
            break;
        
        // handle extra btns ('.', '+/-')
        case currentValue === '.':
            handleFloatInput(currentValue);
            break;

        case currentValue === 'changeSign':
            handleChangeSignInput();
            break;
        
        // handle AC
        case currentValue === 'AC':
            resetAll();
            break;
        
        // handle backspace
        case currentValue === 'del':
            handleDeleteOneChar();
            break;

        // handle signs
        case currentValue === '/':
        case currentValue === '*':
        case currentValue === '-':
        case currentValue === '+':
        case currentValue === 'sqrt':
        case currentValue === '%':
            handleSignInput(currentValue);
            break;

        // handle =
        case currentValue === '=':
            handleEqualInput();
            break;
    }
}

function handleNumberInput(value) {
    if (checkInputForZero() || calculatorObject.calculatedInput) {
        setNewInputValue(value);
    } else {
        inputValuePush(value);
    }

    calculatorObject.setNewOperand(+getCurrentInputValue());
    calculatorObject.setCalculatedInputValueFlag(false);
}

function handleFloatInput(value) {
    if (checkInputIncludesValue('.')) return;
    
    if (!calculatorObject.calculatedInput) {
        inputValuePush(value);
    }
}

function handleChangeSignInput() {
    if (!checkInputForZero() && !calculatorObject.calculatedInput) {
        changeInputSign();
        calculatorObject.setNewOperand(+getCurrentInputValue());
    }
}

function handleSignInput(value) {
    // check: 1) is it result of calculations? 2) it is NOT result after pressing equal
    if (calculatorObject.calculatedInput &&
            (calculatorObject.operand !== calculatorObject.currentRes ||
            calculatorObject.operator)) {
                return;
            }

    if (!calculatorObject.operator) {
        calculatorObject.setNewCurrentRes(calculatorObject.operand);
        calculatorObject.setNewOperator(value);
    } else {
        calculatorObject.setNewCurrentRes(
        calculatorObject.calcNewCurrentRes());
        calculatorObject.setNewOperator(value);

        setNewInputValue(calculatorObject.currentRes);
    }

    calculatorObject.setCalculatedInputValueFlag(true);
}

function handleEqualInput() {
    if (!calculatorObject.operator) return;

    calculatorObject.setNewCurrentRes(
    calculatorObject.calcNewCurrentRes());
    
    setNewInputValue(calculatorObject.currentRes);
    calculatorObject.setCalculatedInputValueFlag(true);
    calculatorObject.setNewOperand(calculatorObject.currentRes);
    calculatorObject.setNewOperator('');
}

function handleDeleteOneChar() {
    if (calculatorObject.calculatedInput) return;
    inputValuePop();
    calculatorObject.setNewOperand(+getCurrentInputValue());
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

function inputValuePop() {
    const inputField = document.querySelector('#result-field');
    inputField.value = inputField.value.slice(0, inputField.value.length - 1);
}

function checkInputForZero() {
    const inputField = document.querySelector('#result-field');
    return inputField.value[0] === '0' && inputField.value.length === 1;
}

function checkInputForFirstZero() {
    const inputField = document.querySelector('#result-field');
    return inputField.value[0] === '0';
}

function checkInputIncludesValue(value) {
    const inputField = document.querySelector('#result-field');
    return inputField.value.includes(value);
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

main();
