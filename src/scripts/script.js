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
  actualResult = execOperation(previousResult, actualResult, operation);
  operation = undefined;
  previousResult = '';
}

export const execOperation = (firstOperand, secondOperand, _operation) => {
  let countResult;

  if (!firstOperand || !secondOperand) {
    return;
  }

  const previousParseResult = parseFloat(firstOperand);
  const actualParseResult = parseFloat(secondOperand);

  if (isNaN(previousParseResult) || isNaN(actualParseResult)) {
    return;
  }
  switch (_operation) {
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

  return countResult;
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
    if (
      actualResult.toString() === '0' &&
      previous[previous.length - 1] === '÷'
    ) {
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
// if (previousResult !== '') {
//   const previous = previousOperand.innerText;
//   if (
//     actualResult.toString() === '0' &&
//     previous[previous.length - 1] === '÷'
//   ) {
//     return allClearFn();
//   }
//   calculate();
// }
//jesli poprzedni wynik nie jest pusty i jesli istnieje mozliwosc ze dzielimy przez 0
//i jesli aktualny wynik jest równy 0 i poprzednie pole na koncu zawiera znak ÷ wtedy uzywamy funkcji allClearFn()

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

//***************************************/

//EVENT LISTENERS

//***************************************/

const initGui = () => {
  numbers.forEach((item) => {
    item.addEventListener('click', () => {
      addNumber(item.innerText);
      updateResultFn();
    });
  });

  // console.log(updateResultFn());
  //nasłuchiwanie klikniecia dla liczb i po kliknieciu bedzie wykonywal nastepujaca funkcje
  //bierzemy zawartosc numbers, i wykonuje funkcje addNumber (po kliknieciu 1 (wykona sie metoda add number ))
  // a nastepnie robie update wynikow

  //***************************************/

  deleteBtn.addEventListener('click', () => {
    deleteNumber();
    updateResultFn();
  });

  //bindujemy deleteBtn do którego przypisujemy funkcje deleteNumber,
  // następnie trzeba zaktualizować wynik dlatego => updateResult

  //***************************************/
  operators.forEach((operator) => {
    operator.addEventListener('click', () => {
      choseOperation(operator.innerText);
      updateResultFn();
    });
  });

  //bindujemy operatory i dodajemy do nich funkcje  choseOperation() a nastepnie funkcję update

  //***************************************/

  equalBtn.addEventListener('click', () => {
    calculate();
    updateResultFn();
  });

  //***************************************/

  allClear.addEventListener('click', () => {
    allClearFn();
    updateResultFn();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initGui();
})

  

