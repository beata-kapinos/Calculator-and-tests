import { JSDOM } from 'jsdom';
import { execOperation, calculate, choseOperation, getPreviousOperandElement, getCurrentOperandElement, updateResultFn, initialState, addNumber } from '../scripts/script.js'
import { cloneDeep } from 'lodash';

const HTML_TEMPLATE = `
<h1 class="title">Nasa Calculator</h1>
<div class="container">
  <img class="img astronaut" src="./assets/icons/astronaut.png" />
  <img class="img planet" src="./assets/icons/saturn.png" />
  <img class="img spaceship" src="./assets/icons/spaceship.png" />
  <img class="img galaxy" src="./assets/icons/spiral-galaxy.png" />
  <div class="calculator-grid">
    <div class="output">
      <div class="previous-operand"></div>
      <div class="current-operand"></div>
    </div>
    <button class="all-clear span-two orange">AC</button>
    <button class="delete round orange">DEL</button>
    <button class="operator round">÷</button>
    <button class="number round">1</button>
    <button class="number round">2</button>
    <button class="number round">3</button>
    <button class="operator round">*</button>
    <button class="number round">4</button>
    <button class="number round">5</button>
    <button class="number round">6</button>
    <button class="operator round">+</button>
    <button class="number round">7</button>
    <button class="number round">8</button>
    <button class="number round">9</button>
    <button class="operator round">-</button>
    <button class="number round">.</button>
    <button class="number round">0</button>
    <button class="equal span-two equal-btn">=</button>
  </div>
</div>
`

describe('calculate', () => {
    test('adding', () => {
        const mockState = {
            previousResult: 1,
            actualResult: 3,
            operation: '+'
        }
    
        calculate(mockState);
    
        expect(mockState.actualResult).toBe(4);
    })
    describe('handle two operations in one session', () => {
        test('adding and multiplying', () => {
            const mockState = cloneDeep(initialState);
            // (5 + 3) * 2 = 16
            addNumber('5', mockState);
            choseOperation('+', mockState);
            addNumber('3', mockState);
            choseOperation('*', mockState);
            addNumber('2', mockState);
            calculate(mockState)

            expect(mockState.previousResult).toBe('');
            expect(mockState.actualResult).toBe(16);
            expect(mockState.operation).toBeUndefined();
        })
    })
    test('handle negative numbers', () => {
        const mockState = cloneDeep(initialState);
        //-6-(-3) = -3
        choseOperation('-', mockState);
        addNumber('6', mockState);
        choseOperation('-', mockState);
        choseOperation('-', mockState);
        addNumber('3', mockState);
        calculate(mockState)

        expect(mockState.previousResult).toBe('');
        expect(mockState.actualResult).toBe(-3);
        expect(mockState.operation).toBeUndefined();
    })
})

describe('execOperation', () => {
    test('adding', () => {
        expect(execOperation(1, 3, '+')).toBe(4);
    })
    test('subtracting', () => {
        expect(execOperation(1, 3, '-')).toBe(-2);
    })
    test('multiplying', () => {
        expect(execOperation(1, 3, '*')).toBe(3);
        expect(execOperation(0, 3, '*')).toBe(0);
    })
    test('dividing', () => {
        expect(execOperation(4, 2, '÷')).toBe(2);
        expect(execOperation(4, 0, '÷')).toBe(undefined)
    })
})

describe('choseOperation', () => {
    describe('given that actual result is empty and operator is negative', () => {
        test('perform addNumber function', () => {
            const mockState = {
                previousResult: 1,
                actualResult: '',
                operation: '-'
            }
            choseOperation('-', mockState);

            expect(mockState.previousResult).toBe(1);
            expect(mockState.actualResult).toBe('-');
            expect(mockState.operation).toBe('-')
        })
    })
    describe('given that actual result is empty', () => {
        test('do nothing', () => {
                const mockState = {
                    previousResult: 1,
                    actualResult: '',
                    operation: '+'
                }
                choseOperation('*', mockState);
            
                expect(mockState.previousResult).toBe(1);
                expect(mockState.actualResult).toBe('');
                expect(mockState.operation).toBe('+')
        })
    })
    describe('given that actual result is not empty', () => {
        describe('and previous result is not empty' , () => {
            test('perform calculation', () => {
                const mockState = {
                    previousResult: 1,
                    actualResult: 3,
                    operation: '+'
                }
                choseOperation('*', mockState);
            
                expect(mockState.previousResult).toBe(4);
                expect(mockState.actualResult).toBe('');
                expect(mockState.operation).toBe('*')
            })
        })
        test('assign new operation and move actual result into the previous result', () => {
            const mockState = {
                previousResult: '',
                actualResult: 3,
                operation: ''
            }
            choseOperation('+', mockState);

            expect(mockState.previousResult).toBe(3);
            expect(mockState.actualResult).toBe('');
            expect(mockState.operation).toBe('+')
        })
    })
})

describe('updateResultFn', () => {
    test('update actual result text', () => {
        const dom = new JSDOM(HTML_TEMPLATE);
        global.document = dom.window.document;
        //global występuje tylko w node
        
        const currentOperandElement = getCurrentOperandElement();
        const previousOperandElement = getPreviousOperandElement();
        currentOperandElement.innerText = '';
        const mockState = {
            previousResult: 3,
            actualResult: 4,
            operation: undefined
        }
        updateResultFn(mockState);
        expect(currentOperandElement.innerText).toEqual(4)
    })
})


