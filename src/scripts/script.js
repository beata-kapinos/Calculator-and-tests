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

// CALCULATE
const calculate = () => {
  let countResult;

  if (!previousResult || !actualResult) {
    return;
  }

  const previousParseResult = parseFloat(previousResult);
  const actualParseResult = parseFloat(actualResult);

  if (isNaN(previousParseResult) || isNaN(actualParseResult)) {
    return;
  }
  switch (operation) {
    case '+':
      countResult = previousParseResult + actualParseResult;
      break;
    case '-':
      countResult = previousParseResult - actualParseResult;
      break;
    case '*':
      countResult = previousParseResult * actualParseResult;
      break;
    case '÷':
      if (actualParseResult === 0) {
        return allClearFn();
      }
      countResult = previousParseResult / actualParseResult;
      break;
    default:
      return;
  }
  actualResult = countResult;
  operation = undefined;
  previousResult = '';
};

//jesli nie istnieje poprzednie ani aktualne dzialanie to wychodzimy z funkcji bo jeżeli nie ma dwóch działań to nie możemy wykonać zadnej operacji
//jesli są liczby to przekształcamy wartości na liczby (bo wcześniej były zapisane w stringu)
//jesli są to liczby to wykonujemy switcha dla poszczególnych operacji
//dodatkowy warunek dla dzielenia => jesli dzielimy przez 0 to js zwraca infinite, więc sprawdzamy,
//jesli wynik jest infinite to czyscimy kalkulator

//funkcja parseFloat() - zwraca liczbę zmiennoprzecinkową

//na końcu kiedy mamy dzialanie (dokonuje podmiany), wykonuje obliczenie
// zmieniam actualne dzialanie (actualResult) na countResult,
// operacje z powrotem na undefined
// i previousResult na "", bo mam już wynik i nie chce mieć poprzedniego

//***************************************/

// CHOSE OPERATION
const choseOperation = (operator) => {
  if (actualResult === '') {
    return;
  }
  if (previousResult !== '') {
    const previous = previousOperand.innerText;
    if (isFinite(actualResult) && previous[previous.length - 1] === '÷') {
      return allClearFn();
    }
    calculate();
  }

  operation = operator;
  previousResult = actualResult;
  actualResult = '';
};
//jesli nie ma zadnego dzialania to wyjdz z funkcji (nie dodawaj operacji)
// w innym wypadku, jesli jest dzialanie to:
//po nacisnieciu oparatorów wybieramy operacje tak, żeby się dodawała a nasz aktualny wynik
//będzie przeskakiwał na poprzedni wynik (previousResult)

//****dodatkowy warunek dla dzielenia, aby po dzieleniu przez 0 i otrzymaniu infinite nie pozostawał znak operacji w poprzednim polu wyniku
//    if (isFinite(actualResult) && previous[previous.length - 1] === '÷') {
// return allClearFn();
// } ==> warunek czysci pole jesli pojawi się infinite

//jesli istnieje poprzednie dzialanie (mamy w polu poprzednie dzialanie - jakąś liczbę ) i jeśli klikamy nową operację
// to wykonujemy ją na poprzednich liczbach w polu => wykonujemy na poprzednich liczbach funkcję calculate()

//***************************************/

// UPDATE
const updateResultFn = () => {
  currentOperand.innerText = actualResult;

  if (operation != null) {
    previousOperand.innerText = previousResult + operation;
  } else {
    previousOperand.innerText = '';
  }
};

//aktualizacja wyniku
//funkcja, która po kazdym wykonaniu jakiegos dzialania, bedzie aktualizowala tablice wynikow
//przypisuje do divow zmienna actualResult / previousResult
//innerText - wybiera to co, znajduje się w elemencie danej klasy(cala zawartosc diva)
// jesli aktualnie wybrana operacja (dzialanie) istnieje i nie jest null, to będziemy ją dodawać
// do poprzedniego dzialania, a jesli jej nie ma to poprzedni wynik będzie pusty
//jesli nie wykonujemy operacji to poprzedniego dzialania nie będzie

//***************************************/

// ADD
const addNumber = (num) => {
  if (num === '.') {
    if (actualResult.includes('.')) {
      return;
    }
  }

  actualResult = actualResult.toString() + num.toString();
};
//dodanie kolejnej cyfry na koniec dzialania
//sprawdzam również czy aktualny wynik zawiera znak ".", jesli tak wychodzę z funkcji return (nie dodaje kolejnej kropki)

//***************************************/

// DELETE
const deleteNumber = () => {
  actualResult = actualResult.toString().slice(0, -1);
};

//usuniecie liczby z aktualnego dzialania. Aktualne dzialanie zastepujemy, aktualnym dzialaniem z wyciętą ostatnią liczbą
//dzialanie na stringu metoda  - slice - wycinam wszystkie liczby oprócz tej ostatniej
//zaczynam od indexu 0 a kończę na przedostatnim -1
//aktualne dzialanie zostanie zastąpione aktualnym działaniem bez ostatniej liczby

//***************************************/

// ALL-CLEAR

const allClearFn = () => {
  actualResult = '';
  previousResult = '';
  operation = undefined;
};
