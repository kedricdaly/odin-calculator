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

const getValidOperators = function() {
    return ['+', '-', 'x', '*', '÷', '/', '%'];
}

const verifyOperate = function() {
    a = 5;
    b = 4;
    operators = getValidOperators();

    for (let ix in operators) {
        switch (operators[ix]) {
            case '+':
                testPassed = add(a, b) == 9
                break;
            case '-':
                testPassed = subtract(b, a) == -1;
                break;
            case 'x': case '*':
                testPassed = multiply(a, b) == 20;
                break;
            case '÷': case '/':
                testPassed = divide(a, b) == 1.25;
                break;
            case '%':
                testPassed = modulo(a, b) == 1;
                break;
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
    // can just evaluate to NaN

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

/**
 * 
 * @param {Object[]} dict - Key-value pairs to change in updateCalc
 *   possible keys: curOperator, curOperand, a, b
 * @param {string} dict.curOperator - Must be one of ['+', '-', 'x', '*', '÷', '/', '%']
 * @param {string} dict.curOperand - Must be 'a' or 'b'
 * @param {(string|int|float)} dict.a - A value representing a number to be operated on
 * @param {(string|int|float)} dict.b - A value representing a number to be operated on
 */
const updateCalcState = function(dict) {
    // using a global, so be careful
    for (key in dict) {
        //console.log(`${key}: ${dict[key]}`)
        if (isCalcStateKeyPairValid(key, dict[key])) {
            calcState[key] = dict[key];
        };
    }
};

/**
 * Returns if a calcState key-value pair is valid
 * @param {string} key calcState parameters to check for validity
 * @param {(string|int|float|enum)} value Parameter value to check for validity
 * @returns {boolan} True if key-value pair is valid, false otherwise
 */
const isCalcStateKeyPairValid = function(key, value) {

    switch (key) {
        case 'curOperator':
            if (getValidOperators().includes(value)) return true;
            console.log(`Cannot update calcState with non-valid operator ${value}`)
        case 'curOperand':
            if (['a', 'b'].includes(value)) return true;
            console.log(`Cannot update calcState with non-valid operand ${value}`)
        case 'a': case 'b':
            // could check they're int or string or float, but assume ok for now
            return true;
        default:
            console.log(`Cannot update calcState with non-valid key ${key}`)
    }
    return false;
};


//window.addEventListener('keydown', (e) => console.log(e))

window.onload = startUp();
calcState = initCalcState();