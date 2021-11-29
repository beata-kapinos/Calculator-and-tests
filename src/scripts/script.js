export const getNumberElements = () => document.querySelectorAll('.number');
export const getOperatorElements = () => document.querySelectorAll('.operator');
export const getAllClearElement = () => document.querySelector('.all-clear');
export const getDeleteBtnElement = () => document.querySelector('.delete');
export const getEqualBtnElement = () => document.querySelector('.equal');
export const getPreviousOperandElement = () => document.querySelector('.previous-operand');
export const getCurrentOperandElement = () => document.querySelector('.current-operand');
export const initialState = {
  actualResult: '',
  previousResult: '',
  operation: undefined,
};

//* *************************************************************/

// CALCULATE
export const calculate = (state) => {
  state.actualResult = execOperation(
    parseFloat(state.previousResult),
    parseFloat(state.actualResult),
    state.operation,
  );
  state.operation = undefined;
  state.previousResult = '';

  if (state.actualResult === undefined) {
    allClearFn(state);
  }
};

export const execOperation = (firstOperand, secondOperand, _operation) => {
  let countResult;

  if (isNaN(firstOperand) || isNaN(secondOperand)) {
    return;
  }

  switch (_operation) {
    case '+':
      countResult = firstOperand + secondOperand;
      break;
    case '-':
      countResult = firstOperand - secondOperand;
      break;
    case '*':
      countResult = firstOperand * secondOperand;
      break;
    case '÷':
      if (secondOperand === 0) {
        return;
      }
      countResult = firstOperand / secondOperand;
      break;
    default:
      return;
  }

  return countResult;
};

//* *************************************************************/

// CHOSE OPERATION
export const choseOperation = (operator, state) => {
  if (state.actualResult === '' && operator === '-') {
    if (state.previousResult === '' || state.operation !== undefined) {
      addNumber('-', state);
      return;
    }
  }
  if (state.actualResult === '' || state.actualResult === '-') {
    return;
  }
  if (state.previousResult !== '') {
    calculate(state);
  }

  state.operation = operator;
  state.previousResult = state.actualResult;
  state.actualResult = '';
};

//* *************************************************************/

// UPDATE
export const updateResultFn = (state) => {
  const currentOperand = getCurrentOperandElement();
  const previousOperand = getPreviousOperandElement();

  console.log(currentOperand, state.actualResult);

  currentOperand.innerText = state.actualResult;

  if (state.operation != null) {
    previousOperand.innerText = state.previousResult + state.operation;
  } else {
    previousOperand.innerText = '';
  }
};

//* *************************************************************/

// ADD
export const addNumber = (num, state) => {
  if (num === '.') {
    if (state.actualResult.includes('.')) {
      return;
    }
  }
  console.log('addNumber');
  state.actualResult = state.actualResult.toString() + num.toString();
};

//* *************************************************************/

// DELETE
const deleteNumber = (state) => {
  state.actualResult = state.actualResult.toString().slice(0, -1);
};

//* *************************************************************/

// ALL-CLEAR

const allClearFn = (state) => {
  state.actualResult = '';
  state.previousResult = '';
  state.operation = undefined;
};

//* *************************************************************/

// EVENT LISTENERS

const initGui = (state) => {
  getNumberElements().forEach((item) => {
    item.addEventListener('click', () => {
      addNumber(item.innerText, state);
      updateResultFn(state);
    });
  });

  //* *************************************************************/

  getDeleteBtnElement().addEventListener('click', () => {
    deleteNumber(state);
    updateResultFn(state);
  });

  //* *************************************************************/
  getOperatorElements().forEach((operator) => {
    operator.addEventListener('click', () => {
      choseOperation(operator.innerText, state);
      updateResultFn(state);
    });
  });

  //* *************************************************************/

  getEqualBtnElement().addEventListener('click', () => {
    calculate(state);
    updateResultFn(state);
  });

  //* *************************************************************/

  getAllClearElement().addEventListener('click', () => {
    allClearFn(state);
    updateResultFn(state);
  });
};

//* *************************************************************/

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    initGui(initialState);
  });
}
