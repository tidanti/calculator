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

function operate(operand, operator, enteredValue) {
    let result;
    switch (operator) {
        case '+':
            result = add(operand, enteredValue);
            break;
        case '-':
            result = subtract(operand, enteredValue);
            break;
        case '*':
            result = multiply(operand, enteredValue);
            break;
        case '/':
            result = divide(operand, enteredValue);
    }

    return result;
}

function Calculator() {
    this.operand = 0;
    this.operator = '';
    this.calculate = enteredValue => {
        return operate(this.operand, this.operator, enteredValue);
    };
}

function mainTests() {
    calculatorObject.operand = 2;
    calculatorObject.operator = '*';
    let res = calculatorObject.calculate(3);
    console.log(res);
}

//mainTests();
