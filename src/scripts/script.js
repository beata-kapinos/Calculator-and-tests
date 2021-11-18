const numbers = document.querySelectorAll('.number');
//wyszukuje elementy - wszystkie o klasie number
const operators = document.querySelectorAll('.operator');
//wszystkie operatory
const allClear = document.querySelector('.all-clear');
//wyszukuje klasę all-clear
const deleteBtn = document.querySelector('.delete');
const equalBtn = document.querySelector('.equal');
const previousOperand = document.querySelector('.previous-operand');
//poprzednie działanie
const currentOperand = document.querySelector('.current-operand');
//aktualne działanie

//variables
let actualResult = ''; //zmienna przechowująca wartosc aktualnego działania
let previousResult = ''; //wartość poprzedniego dzialania
let operation = undefined; //aktualnie wybrana operacja, jesli klikne +, zmienna zmieni się na +

//***************************************/
