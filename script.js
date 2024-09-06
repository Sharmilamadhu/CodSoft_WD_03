document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    let currentInput = '';
    let operator = '';
    let firstOperand = '';

    const updateDisplay = () => {
        display.textContent = currentInput || '0';
    };

    const handleNumber = (value) => {
        
        if (currentInput.length < 15) { 
            currentInput += value;
            updateDisplay();
        }
    };

    const handleOperator = (value) => {
        if (currentInput === '' && value !== '-') return; 
        if (firstOperand !== '') {
            calculate();
        }
        firstOperand = currentInput;
        operator = value;
        currentInput = '';
       
        display.textContent = `${firstOperand} ${operator}`;
    };

    const calculate = () => {
        if (firstOperand === '' || currentInput === '' || operator === '') return;

        const a = parseFloat(firstOperand);
        const b = parseFloat(currentInput);
        let result;

        switch (operator) {
            case '+':
                result = a + b;
                break;
            case '-':
                result = a - b;
                break;
            case '*':
                result = a * b;
                break;
            case '/':
                if (b === 0) {
                    display.textContent = 'Error'; 
                    currentInput = '';
                    firstOperand = '';
                    operator = '';
                    return;
                }
                result = a / b;
                break;
            default:
                return;
        }

        
        currentInput = result.toString().length > 15 ? result.toExponential(5) : result.toString();
        operator = '';
        firstOperand = '';
        updateDisplay();
    };

    const clear = () => {
        currentInput = '';
        operator = '';
        firstOperand = '';
        updateDisplay();
    };

    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');
            if (button.classList.contains('operator')) {
                handleOperator(value);
            } else if (button.classList.contains('equals')) {
                calculate();
            } else if (button.classList.contains('clear')) {
                clear();
            } else {
                handleNumber(value);
            }
        });
    });
});
