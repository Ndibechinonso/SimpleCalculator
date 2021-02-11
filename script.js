class Calculator {
    // these two parmeters control the calculator display
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear() {
        this.currentOperand = ""
        this.previousOperand = ""
        this.operation = ""
    }

// method to handle operand input
    appendNumber(number) {
        // this prevents inputting more than one decimal point in a number
        if (number === "." && this.currentOperand.includes(".")) return
        this.currentOperand += number
    }

// method to delete a number
     delete() { 
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

// method to select an operator 
    chooseOperand(operation) {
        if (this.currentOperand === "") return
        if(this.previousOperand !== "" && this.currentOperand !== "") {
            this.calculate()
        } 
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.previousOperand = parseFloat(this.currentOperand) + this.operation;
        this.currentOperand = ""
    }

    // method to perform an operation with the operand(s) and operatiom 
    calculate() {
        let result
        const previous = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        switch (this.operation) {
            case "+":
                result = previous + current
                break

            case "÷":
                result = previous / current
                break

            case "-":
                result = previous - current
                break

            case "*":
                result = previous * current
                break

            case "%":
                result = previous / 100
                break

            default:
                return
        }
        this.currentOperand = result
        this.previousOperand = ""
    }
 // method to update the display of the calculator
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand
        this.previousOperandTextElement.innerText = this.previousOperand
    }
}

const previousOperandTextElement = document.querySelector("[data-previous-operator]")
const currentOperandTextElement = document.querySelector("[data-current-operator]")
const clearAll = document.querySelector("[data-clear-all]")
const operators = document.querySelectorAll("[data-operator]")
const numberButtons = document.querySelectorAll("[data-number]")
const equalsKey = document.querySelector("[data-equals]")
const del = document.querySelector("[data-clear]")

// instance of Calculator Class
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

// removes number key indicator
const unSelectNumber = () => {
    numberButtons.forEach((button) => {
        button.classList.remove("number-active");
    });
};

// removes operator key indicator
const unSelectOperator = () => {
    operators.forEach((button) => {
        button.classList.remove("operation-select");
    });
};

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        unSelectNumber()
        button.classList.add("number-active")
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
        operators.forEach(k => k.classList.remove("operation-select"))
        del.classList.remove("number-active")
        clearAll.classList.remove("clear-active")
    })
})

clearAll.addEventListener("click", () => {
    clearAll.classList.add("clear-active")
    calculator.clear()
    calculator.updateDisplay()
    operators.forEach(k => k.classList.remove("operation-select"))
    numberButtons.forEach(k => k.classList.remove("number-active"))
    del.classList.remove("number-active")
})

operators.forEach(button => {
    button.addEventListener("click", () => {
        unSelectOperator()
        button.classList.add("operation-select")
        calculator.chooseOperand(button.innerHTML)
        calculator.updateDisplay()
        numberButtons.forEach(k => k.classList.remove("number-active"))
        del.classList.remove("number-active")
        clearAll.classList.remove("clear-active")
    })
})

// fuction to handle Percentage operation since it doesnt require a second operand
operators.forEach(button => {
    if (button.innerHTML === "%") {
        button.addEventListener("click", () => {
            calculator.chooseOperand(button.innerHTML)
            calculator.calculate()
            calculator.updateDisplay()
            numberButtons.forEach(k => k.classList.remove("number-active"))
            del.classList.remove("number-active")
            clearAll.classList.remove("clear-active")
        })
    }
})

equalsKey.addEventListener("click", button => {
    if (previousOperandTextElement.innerHTML === "") return
    calculator.calculate()
    calculator.updateDisplay()
    numberButtons.forEach(k => k.classList.remove("number-active"))
    del.classList.remove("number-active")
    clearAll.classList.remove("clear-active")
})

del.addEventListener("click", () => {
    del.classList.add("number-active")
    calculator.delete()
    calculator.updateDisplay()
    unSelectNumber()
    operators.forEach(k => k.classList.remove("operation-select"))
    numberButtons.forEach(k => k.classList.remove("number-active"))
    clearAll.classList.remove("clear-active")
})
