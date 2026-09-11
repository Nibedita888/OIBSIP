// ==============================
// Get HTML Elements
// ==============================

const temperatureInput = document.getElementById("temperature");
const unitSelect = document.getElementById("unit");
const convertBtn = document.getElementById("convertBtn");

const errorMessage = document.getElementById("errorMessage");

const celsiusResult = document.getElementById("celsiusResult");
const fahrenheitResult = document.getElementById("fahrenheitResult");
const kelvinResult = document.getElementById("kelvinResult");


// ==============================
// Convert Temperature
// ==============================

function convertTemperature() {

    const input = temperatureInput.value.trim();
    const unit = unitSelect.value;


    // Empty input validation
    if (input === "") {

        showError("Please enter a temperature value.");

        clearResults();

        return;
    }


    // Numeric validation
    const temperature = Number(input);

    if (!Number.isFinite(temperature)) {

        showError("Please enter a valid numeric temperature.");

        clearResults();

        return;
    }


    // Convert input to Celsius
    let celsius;


    if (unit === "celsius") {

        celsius = temperature;

    } else if (unit === "fahrenheit") {

        celsius = (temperature - 32) * 5 / 9;

    } else if (unit === "kelvin") {

        celsius = temperature - 273.15;
    }


    // Absolute zero validation
    if (celsius < -273.15) {

        showError(
            "Invalid temperature. It cannot be below absolute zero (−273.15°C)."
        );

        clearResults();

        return;
    }


    // Calculate other units
    const fahrenheit = (celsius * 9 / 5) + 32;

    const kelvin = celsius + 273.15;


    // Display results
    celsiusResult.textContent =
        `${celsius.toFixed(2)} °C`;

    fahrenheitResult.textContent =
        `${fahrenheit.toFixed(2)} °F`;

    kelvinResult.textContent =
        `${kelvin.toFixed(2)} K`;


    // Remove error
    hideError();
}


// ==============================
// Show Error
// ==============================

function showError(message) {

    errorMessage.textContent = message;

    errorMessage.classList.add("show");
}


// ==============================
// Hide Error
// ==============================

function hideError() {

    errorMessage.textContent = "";

    errorMessage.classList.remove("show");
}


// ==============================
// Clear Results
// ==============================

function clearResults() {

    celsiusResult.textContent = "--";

    fahrenheitResult.textContent = "--";

    kelvinResult.textContent = "--";
}


// ==============================
// Button Click
// ==============================

convertBtn.addEventListener(
    "click",
    convertTemperature
);


// ==============================
// Enter Key Support
// ==============================

temperatureInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            convertTemperature();
        }
    }
);


// ==============================
// Clear Error While Typing
// ==============================

temperatureInput.addEventListener(
    "input",
    function () {

        hideError();
    }
);
