const add = function(a, b) {
    return a + b;
};

const subtract = function(a, b) {
    return a - b;
};

const multiply = function(a, b) {
    return a * b;
};

const divide = function(a, b) {
    if (b == 0) {console.log('Cannot divide by zero'); return NaN;}
    return a / b;
};

const modulo = function(a, b) {
    if (b==0) {console.log('Cannot modulo by zero'); return NaN;}
    return a % b;
}

a = 10
b = 2
operator = '+'

const operate = function(operator, a, b) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case 'x': case '*':
            return multiply(a, b);
        case '÷': case '/':
            return divide(a, b);
        case '%':
            return modulo(a, b);
        default:
            return null
    }
}

const verifyOperate = function() {
    a = 5;
    b = 4;
    operators = ['+', '-', '*', '/', '%'];

    for (let ix in operators) {
        switch (operators[ix]) {
            case '+':
                testPassed = add(a, b) == 9
            case '-':
                testPassed = subtract(a, b) == -1;
            case 'x': case '*':
                testPassed = multiply(a, b) == 20;
            case '÷': case '/':
                testPassed = divide(a, b) == 1.2;
            case '%':
                testPassed = modulo(a, b) == 1;
            default:
                
        }
        testPassed ? console.log(`Test ${operators[ix]} passed`) : console.log(`Test ${operators[ix]} failed`)
    }

}