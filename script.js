const numberButtons = document.querySelectorAll(`[data-number]`);
const bracketButtons = document.querySelectorAll(`[data-bracket]`);
const operationButtons = document.querySelectorAll(`[data-operation]`);
const equalsButton = document.querySelector(`[data-equals]`);
const deleteButton = document.querySelector(`[data-delete]`);
const allClearButton = document.querySelector(`[data-all-clear]`);
const previousOperandTextElement = document.querySelector(
  `[data-previous-operand]`
);
const currentOperandTextElement = document.querySelector(
  `[data-current-operand]`
);

class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.bracketCalc = 0;
    this.currentOperand = ``;
    this.operandArr = [];
  }

  clear() {
    this.bracketCalc = 0;
    this.currentOperand = ``;
    this.operandArr = [];
  }

  delete() {
    this.currentOperand = this.currentOperand.slice(0, -1);
  }

  appendNumber(number) {
    if (this.operandArr.at(-1) === `)`) return;
    if (number === `.` && this.currentOperand.includes(`.`)) return;

    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.operandArr.at(-1) === `)`) {
    } else {
      if (this.currentOperand === ``) return;
    }

    if (this.currentOperand !== ``) {
      this.operandArr.push(this.currentOperand);
    }
    if (this.operandArr.at(-1) === `(`) return;
    this.operandArr.push(operation);
    this.currentOperand = ``;
  }

  bracketCase(bracketSort) {
    if (bracketSort === `(`) {
      if (this.currentOperand) return;
      if (this.operandArr.at(-1) === `)`) return;
      this.bracketCalc++;
      this.operandArr.push(`(`);
    } else {
      if (this.bracketCalc < 1) return;

      if (this.operandArr.at(-1) === `)`) {
      } else {
        if (this.currentOperand === ``) return;
      }

      if (this.operandArr.at(-1) === `(`) return;

      this.bracketCalc--;

      if (this.currentOperand !== ``) {
        this.operandArr.push(this.currentOperand);
      }

      this.currentOperand = ``;
      this.operandArr.push(`)`);

      console.log(this.operandArr);
    }
  }

  computeBrackets() {
    let indexCloseBracket = this.operandArr.findIndex((el) => el === `)`);

    if (indexCloseBracket === -1) return;

    let newArr = this.operandArr.slice(0, indexCloseBracket);

    let indexOpenBracket = newArr.lastIndexOf(`(`);

    newArr = this.operandArr.slice(indexOpenBracket + 1, indexCloseBracket);

    this.compute(`**`, `√`, newArr);
    this.compute(`*`, `/`, newArr);
    this.compute(`+`, `-`, newArr);
    console.log(newArr);

    this.operandArr[indexOpenBracket] = newArr[0];
    this.operandArr.splice(
      indexOpenBracket + 1,
      indexCloseBracket - indexOpenBracket
    );

    console.log(indexOpenBracket, indexCloseBracket);
    console.log(this.operandArr);

    this.computeBrackets();
  }

  compute(operation1, operation2, arr) {
    if (this.bracketCalc !== 0) return;

    let indexValue = arr.findIndex(
      (el) => el === operation1 || el === operation2
    );

    if (indexValue === -1) return;

    let newValue = 0;

    if (arr[indexValue] === `**`) {
      newValue = Math.pow(+arr[indexValue - 1], +arr[indexValue + 1]);
    }

    if (arr[indexValue] === `√`) {
      newValue = Math.pow(+arr[indexValue - 1], 1 / +arr[indexValue + 1]);
    }

    if (arr[indexValue] === `*`) {
      newValue = +arr[indexValue - 1] * +arr[indexValue + 1];
    }

    if (arr[indexValue] === `/`) {
      newValue = +arr[indexValue - 1] / +arr[indexValue + 1];
    }

    if (arr[indexValue] === `+`) {
      newValue = +arr[indexValue - 1] + +arr[indexValue + 1];
    }

    if (arr[indexValue] === `-`) {
      newValue = +arr[indexValue - 1] - +arr[indexValue + 1];
    }

    arr[indexValue - 1] = newValue;
    arr.splice(indexValue, 1);
    arr.splice(indexValue, 1);

    this.compute(operation1, operation2, arr);
  }

  updateDisplay() {
    this.previousOperandTextElement.innerText = this.operandArr.join(``);
    calculator.currentOperandTextElement.innerText = this.currentOperand;
  }
}

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

numberButtons.forEach((button) => {
  button.addEventListener(`click`, (e) => {
    e.preventDefault();

    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener(`click`, (e) => {
    e.preventDefault();

    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

bracketButtons.forEach((button) => {
  button.addEventListener(`click`, (e) => {
    e.preventDefault();

    calculator.bracketCase(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener(`click`, (e) => {
  e.preventDefault();

  if (calculator.currentOperand) {
    calculator.operandArr.push(calculator.currentOperand);
  } else {
    if (calculator.operandArr.at(-1) === `)`) {
    } else {
      return;
    }
  }

  calculator.computeBrackets();
  calculator.compute(`**`, `√`, calculator.operandArr);
  calculator.compute(`*`, `/`, calculator.operandArr);
  calculator.compute(`+`, `-`, calculator.operandArr);

  calculator.currentOperand = calculator.operandArr[0];
  calculator.operandArr = [];

  calculator.updateDisplay();
});

deleteButton.addEventListener(`click`, (e) => {
  e.preventDefault();

  console.log(calculator.currentOperand);
  calculator.delete();
  console.log(calculator.currentOperand);
  calculator.updateDisplay();
});

allClearButton.addEventListener(`click`, (e) => {
  e.preventDefault();

  calculator.clear();
  calculator.updateDisplay();
});
