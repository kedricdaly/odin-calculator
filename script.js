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
            return null;
    }
};

const getValidOperators = function() {
    return ['+', '-', 'x', 'X', '*', '÷', '/', '%'];
}

const verifyOperate = function() {
    a = 5;
    b = 4;
    operators = getValidOperators();

    for (let ix in operators) {
        switch (operators[ix]) {
            case '+':
                testPassed = operate('+', a, b) == 9
                break;
            case '-':
                testPassed = operate('-', b, a) == -1;
                break;
            case 'x': case 'X': case '*':
                testPassed = operate('*', a, b) == 20;
                break;
            case '÷': case '/':
                testPassed = operate('/', a, b) == 1.25;
                break;
            case '%':
                testPassed = operate('%', a, b) == 1;
                break;
            default:
                
        }
        testPassed ? console.log(`Test ${operators[ix]} passed`) : console.log(`Test ${operators[ix]} failed`)
    }
};

const getNewText = function(e) {
    if (e.type == 'keydown') {
        return e.key;
    };

    if (e.type == 'click') {
        return e.target.textContent;
    };
}

const updateCurrentDisplay = function(e) {
    newText = getNewText(e);
    const curDisplay = document.querySelector('.displayCurrent');
    curText = curDisplay.textContent;

    // prevent leading zeros
    if (curText === '' || curText === '0') {
        if ((curText === '') && (newText === '.')) {
            newText = '0.'; // add leading zero for solo decimal point
        }
            curDisplay.textContent = newText;
    } else if ((curText.includes('.') && newText === '.')) {
            // do not add an additional decimal point
    } else {
        curDisplay.textContent += newText;
    };

    // after a return, if user does not immediately select another operator
    // we want to swap the current operand back to a from b
    // curOperand should be empty, and both a: and b: should have values
    // we should take the value from the curDisplay, and put it into a
    // we should do this by setting the curOperand to a

    let previousResult = (getCalcState('curOperator') === '')
                         && (getCalcState('curOperand') === 'b')
                         && (getCalcState('a') !== '')
                         && (getCalcState('b') === '');

    if (previousResult) {
        updateCalcState({curOperand: 'a'});
        clearHistoricDisplay();
    }

    updateCalcState({
        [getCalcState('curOperand')]: curDisplay.textContent
    });
};

const updateHistoricDisplay = function(e) {
    const histDisplay = document.querySelector('.displayHistory');
    const curDisplay = document.querySelector('.displayCurrent');

    newText = getNewText(e);

    // special handling required for negative numbers because they begin with '-' which is an operator
    // TODO: does it make sense just to check the last char of histDisplay for an operator?
    if (getCalcState('a') < 0) {
        isAlreadyOperator = getValidOperators().some(op => histDisplay.textContent.slice(1).includes(op));
    } else {
        isAlreadyOperator = getValidOperators().some(op => histDisplay.textContent.includes(op));
    }
    
    // do not allow multiple operators to appear in histDisplay
    if (isAlreadyOperator) {
        histDisplay.textContent = histDisplay.textContent.slice(0,-1);
    };

    const startOperand = getCalcState('curOperand')
    switch (startOperand) {
        case 'a':
            updateCalcState({
                curOperand: 'b',
                a: curDisplay.textContent,
            });
            histDisplay.textContent = curDisplay.textContent + ' ' + newText;
            break;
        case 'b':
            if (getCalcState('curOperator')){
                evaluateCalc();
            }
            histDisplay.textContent = histDisplay.textContent + ' ' + newText;
            break;
    }

    updateCalcState({curOperator: newText})    
    clearCurrentDisplay();
};

const clearCurrentDisplay = function() {
    const curDisplay = document.querySelector('.displayCurrent');
    curDisplay.textContent = '';

    updateCalcState({
        [getCalcState('curOperand')]: curDisplay.textContent
    });
};

const clearHistoricDisplay = function(e) {
    const histDisplay = document.querySelector('.displayHistory');
    histDisplay.textContent = '';

    updateCalcState({
        curOperator: '',
        a: '',
        b: '',
    })
};

const clearDisplay = function(e) {
    updateCalcState({curOperand: 'a'});
    clearCurrentDisplay();
    clearHistoricDisplay();
};

const deleteCharFromCurrentDisplay = function() {
    const curDisplay = document.querySelector('.displayCurrent');
    curDisplay.textContent = curDisplay.textContent.slice(0,-1);

    if (curDisplay.textContent === '') {
        curDisplay.textContent = 0;
    }

    updateCalcState({
        [getCalcState('curOperand')]: curDisplay.textContent
    });

};

const evaluateCalc = function() {
    const histDisplay = document.querySelector('.displayHistory');

    curOperator = getCalcState('curOperator');
    if (!getValidOperators().includes(curOperator)) return;

    a = parseFloat(getCalcState('a'));
    if (isNaN(a)) return;

    b = parseFloat(getCalcState('b'));
    if (isNaN(b)) return;

    result = operate(curOperator, a, b);
    histDisplay.textContent = result;
    updateCalcState({curOperator: '', a: result, curOperand: 'b'});
    clearCurrentDisplay();

};

const startUp = function() {
    const numBtns = Array.from(document.querySelectorAll('.numbers button'));
    numBtns.forEach(btn => btn.addEventListener('click', updateCurrentDisplay));

    const opBtns = Array.from(document.querySelectorAll('.operators button'));
    opBtns.forEach(btn => btn.addEventListener('click', updateHistoricDisplay));

    const clearKey = document.querySelector('#clearKey');
    clearKey.addEventListener('click', clearCurrentDisplay);

    const delKey = document.querySelector('#deleteKey');
    delKey.addEventListener('click', deleteCharFromCurrentDisplay);

    const eqKey = document.querySelector('#equalsKey');
    eqKey.addEventListener('click', evaluateCalc);

    const allClearKey = document.querySelector('#allClearKey');
    allClearKey.addEventListener('click', clearDisplay);

};

const initCalcState = function() {
    // returns a global calcState variable

    curDisplay = document.querySelector('.displayCurrent');

    curDisplay.textContent ? aValue = curDisplay.textContent : aValue = '';

    return calcState = {
        curOperator: '',
        curOperand: 'a',
        a: aValue,
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
            if ([''].concat(getValidOperators()).includes(value)) return true;
            console.log(`Cannot update calcState with non-valid operator ${value}`);
            break;
        case 'curOperand':
            if (['a', 'b'].includes(value)) return true;
            console.log(`Cannot update calcState with non-valid operand ${value}`);
            break;
        case 'a': case 'b':
            // could check they're int or string or float, but assume ok for now
            return true;
        case '':
            return true;
        default:
            console.log(`Cannot update calcState with non-valid key ${key}`);
    }
    return false;
};

const getCalcState = function(thisParam) {
    
    return (['curOperator', 'curOperand', 'a', 'b'].includes(thisParam)) ? calcState[thisParam] : null;

};

const getValidKeys = function() {
    return [getValidNumKeys(), getValidOperators(), '=', 'Enter', 'Delete', 'Backspace'].flat();
};

const getValidNumKeys = function() {
    return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
}

const keyboardInput = function(e) {

    const thisKey = e.key;

    if (!getValidKeys().includes(thisKey)) {
        return;
    }

    // prevent trying to search if '/' is pressed for divide
    if (thisKey === '/') {
        e.preventDefault();
    };

    if (getValidOperators().includes(thisKey)) {
        updateHistoricDisplay(e);
    };

    if (getValidNumKeys().includes(thisKey)) {
        updateCurrentDisplay(e);
    };

    if (thisKey === '=' || thisKey === 'Enter') {
        evaluateCalc();
    };

    if (thisKey === 'Backspace' || thisKey === 'Delete') {
        deleteCharFromCurrentDisplay();
    };

};

window.addEventListener('keydown', (e) => keyboardInput(e))

window.onload = startUp();
calcState = initCalcState();