let display = document.querySelector(".display");
let display2 = document.querySelector(".display2");

function appendToDisplay(value) {
    // Prevent multiple operators in a row
    const operators = ['+', '–', '×', '÷'];
    const oper = ['×', '÷', "+"];
    const lastChar = display.innerHTML.slice(-1);
    if (display.innerHTML === '' && oper.includes(value)) {
        return;
    }
        // prevents multiple operators in a row
     if (operators.includes(value) && operators.includes(lastChar)) {
      return;
        }
    // Prevent multiple decimal points in a number
    if (value === '.' && lastChar === '.') {
        return;
    }
    if (display.innerHTML.length >20){
        alert("You have reached the maximum limit of characters")
        return;
    }
    // If the Second display is not empty and the last character is an operator, replace it with the new operator
    if (display2.innerHTML !== '') {
        if (operators.includes(value)) {
            // Continue calculation with result
            display.innerHTML += value;
            display2.innerHTML = ''; // Clear history after operator press
        } else {
            // Start new calculation
            clearDisplay();
            display.innerHTML = value;
        }
        return;
    }
    // Default append behavior
    display.innerHTML += value;
}


function backspace() {
    if (display.innerHTML.length > 0) {
        display.innerHTML = display.innerHTML.slice(0, -1);
    }
}

function clearDisplay() {
    display.innerHTML = "";
    display2.innerHTML = "";
}

function calculate() {
    try {
        if(!display.innerHTML) {
            return;
        }
        // Store the expression in display2 before calculating
        display2.innerHTML = display.innerHTML;
        
        // Replace mathematical symbols with JavaScript operators
        let expression = display.innerHTML.replace(/×/g, '*') .replace(/÷/g, '/').replace(/–/g, '-');
            
        // Calculate and format the result
        let result = eval(expression);
        
        // Handle decimal places
        if (Number.isInteger(result)) {
            display.innerHTML = result;
        } else {
            display.innerHTML = parseFloat(result.toFixed(5));
        }
    } catch (error) {
        display.innerHTML = "Error";
        setTimeout(() => {
            display.innerHTML = "";
        }, 1000);
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const moonIcon = document.querySelector('.len');
    moonIcon.classList.toggle('fa-sun');
    moonIcon.classList.toggle('fa-moon');
}
document.addEventListener("keydown" , (event) =>{
    if(event.key === "Enter"){
        calculate()
        keyAnimation(event.key)
    }else  if(event.key === "Backspace"){
        keyAnimation(event.key)
        backspace()}
        else if (!isNaN(event.key) || event.key === "." || event.key === "+" || event.key === "-" || event.key === "*" || event.key === "/") {
            appendToDisplay(event.key)
            keyAnimation(event.key)
        }else if (event.key === "Escape" || event.key === "Delete"){
            clearDisplay()
            keyAnimation(event.key)
        }
})
function keyAnimation(key){
    document.getElementById( key).classList.add("pressed")
    setTimeout(() =>{
        document.getElementById(+ key).classList.remove("pressed")
    }, 100)
}
// Add this after your existing code to check button IDs
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn');
    console.log('Available button IDs:');
    buttons.forEach(button => console.log(button.id));
});