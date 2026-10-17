export function initCalculatorContent(container) {
    container.innerHTML = `
        <div class="calculator-container">
            <input type="text" class="calc-display" value="0" readonly />
            <div class="calc-buttons">
                <button class="calc-btn" data-action="clear">C</button>
                <button class="calc-btn" data-action="back">⌫</button>
                <button class="calc-btn operator" data-value="/">/</button>
                <button class="calc-btn operator" data-value="*">×</button>
                <button class="calc-btn" data-value="7">7</button>
                <button class="calc-btn" data-value="8">8</button>
                <button class="calc-btn" data-value="9">9</button>
                <button class="calc-btn operator" data-value="-">-</button>
                <button class="calc-btn" data-value="4">4</button>
                <button class="calc-btn" data-value="5">5</button>
                <button class="calc-btn" data-value="6">6</button>
                <button class="calc-btn operator" data-value="+">+</button>
                <button class="calc-btn" data-value="1">1</button>
                <button class="calc-btn" data-value="2">2</button>
                <button class="calc-btn" data-value="3">3</button>
                <button class="calc-btn equals" data-action="calculate">=</button>
                <button class="calc-btn" data-value="0" style="grid-column: span 2;">0</button>
                <button class="calc-btn" data-value=".">.</button>
            </div>
        </div>
    `;

    const display = container.querySelector(".calc-display");
    let currentInput = "0";

    container.querySelectorAll(".calc-btn").forEach(button => {
        button.addEventListener("click", () => {
            const value = button.getAttribute("data-value");
            const action = button.getAttribute("data-action");

            if (value !== null) {
                if (currentInput === "0") {
                    currentInput = value;
                } else {
                    currentInput += value;
                }
            } else if (action === "clear") {
                currentInput = "0";
            } else if (action === "back") {
                currentInput = currentInput.length > 1 ? currentInput.slice(0, -1) : "0";
            } else if (action === "calculate") {
                try {
                    // Reemplazamos símbolos visuales para la evaluación segura básica
                    let expression = currentInput.replace(/×/g, "*");
                    currentInput = eval(expression).toString();
                } catch (e) {
                    currentInput = "Error";
                }
            }
            display.value = currentInput;
        });
    });
}