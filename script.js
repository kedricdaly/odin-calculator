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
};

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
};

const verifyOperate = function() {
    a = 5;
    b = 4;
    operators = ['+', '-', 'x', '*', '÷', '/', '%'];

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

};

const updateCurrentDisplay = function(e) {
    const curDisplay = document.querySelector('.displayCurrent');
    curText = curDisplay.textContent;
    // prevent leading zeros
    if (curDisplay.textContent === '' || curDisplay.textContent === '0') {
            curDisplay.textContent = e.target.textContent;
    } else {
        curDisplay.textContent += e.target.textContent;
    };
};

const updateHistoricDisplay = function(e) {
    console.log('updateHistoricDisplay: ')
    console.log(e)
    const histDisplay = document.querySelector('.displayHistory')
    const curDisplay = document.querySelector('.displayCurrent')
    if (e.textContent === '=') {
        // TODO: operate(operator, a, b)
    }
    calcState.curOperand = e.target.textContent;
    calcState.a = curDisplay.textContent;

    histDisplay.textContent = curDisplay.textContent + ' ' + e.target.textContent;
    clearCurrentDisplay();
};

const clearCurrentDisplay = function() {
    const curDisplay = document.querySelector('.displayCurrent');
    curDisplay.textContent = '';
};

const clearHistoricDisplay = function(e) {
    const histDisplay = document.querySelector('.displayHistory');
    histDisplay.textContent = '';

    calcState.curOperator = '';
    calcState.a = '';
    calcState.b = '';
};

const clearDisplay = function(e) {
    //console.log('clearDisplay:')
    //console.log(e)
    clearCurrentDisplay()
    clearHistoricDisplay()
};

const deleteCharFromCurrentDisplay = function(e) {
    const curDisplay = document.querySelector('.displayCurrent');
    curDisplay.textContent = curDisplay.textContent.slice(0,-1);
};

const evaluateCalc = function(e) {
    const curDisplay = document.querySelector('.displayCurrent');
    // TODO: move curDisplay to historical display
    // TODO: parse & evaluate expression
};

const parseDisplay = function(disp) {
    // how to protect against someone editing the DOM directly to include alphanumeric or other?

};

const startUp = function() {
    const numBtns = Array.from(document.querySelectorAll('.numbers'))
    numBtns.forEach(btn => btn.addEventListener('click', updateCurrentDisplay))

    const opBtns = Array.from(document.querySelectorAll('.operators'))
    opBtns.forEach(btn => btn.addEventListener('click', updateHistoricDisplay))

    const clearKey = document.querySelector('#clearKey')
    clearKey.addEventListener('click', clearCurrentDisplay)

    const delKey = document.querySelector('#deleteKey')
    delKey.addEventListener('click', deleteCharFromCurrentDisplay)

    const eqKey = document.querySelector('#equalsKey')
    eqKey.addEventListener('click', evaluateCalc)

    const allClearKey = document.querySelector('#allClearKey')
    allClearKey.addEventListener('click', clearDisplay)



};

const initCalcState = function() {
    // returns a global calcState variable
    return calcState = {
        curOperator: '',
        curOperand: 'a',
        a: '',
        b: ''
    };
};


//window.addEventListener('keydown', (e) => console.log(e))

window.onload = startUp();
calcState = initCalcState();