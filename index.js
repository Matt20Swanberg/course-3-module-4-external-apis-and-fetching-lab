/**
 * Weather Alerts App
 * -------------------
 * This app allows a user to enter a U.S. state abbreviation and fetch
 * active weather alerts from the National Weather Service API.
 *
 * Features:
 * - Fetches alerts using the Weather.gov API
 * - Displays alert summaries and headlines
 * - Handles errors (invalid input, network issues)
 * - Dynamically updates the DOM
 */
const weatherApi = "https://api.weather.gov/alerts/active?area="

/**
 * Fetches weather alerts for a given state from the Weather.gov API.
 *
 * @param {string} state - The two-letter state abbreviation (e.g., "NJ")
 * @returns {void}
 */
function fetchWeatherAlerts(state) {
    fetch(`https://api.weather.gov/alerts/active?area=${state}`)
        .then(function (response) {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            clearError();
            displayAlerts(data);
        })
        .catch(function (error) {
            showError(error.message);
        })
}

/**
 * Displays weather alert data on the page.
 *
 * Creates a summary message and a list of alert headlines,
 * then appends them to the DOM.
 *
 * @param {Object} data - The API response object containing alert data
 * @returns {void}
 */
function displayAlerts(data) {
    const alertsDisplay = document.getElementById("alerts-display");
    const summary = document.createElement("p");
    const list = document.createElement("ul");

    // Clear existing results
    alertsDisplay.textContent = "";

    summary.textContent = `${data.title}: ${data.features.length}`;

    data.features.forEach(function (alertItem) {
        const li = document.createElement("li");
        li.textContent = alertItem.properties.headline;
        list.append(li);
    })

    alertsDisplay.append(summary, list);
}

/**
 * Handles button click to fetch weather alerts.
 *
 * - Reads user input
 * - Validates input
 * - Calls fetchWeatherAlerts
 * - Clears the input field
 */
const button = document.getElementById("fetch-alerts");
button.addEventListener("click", function () {
    const input = document.getElementById("state-input");
    const state = input.value;

    if (!state) {
        showError("Please enter a state abbreviation");
    } else if(state.length !==2){
        showError("Please enter a 2 letter state abbreviation")
    }else if (!/^[a-zA-Z]{2}$/.test(state)){
        showError("Please enter a state abbreviation containing ONLY letters")
    }
    
    else {
        fetchWeatherAlerts(state.toUpperCase());
    }
    input.value = ""; // clear AFTER using it
});

/**
 * Displays an error message to the user.
 *
 * Makes the error message div visible and updates its text.
 *
 * @param {string} message - The error message to display
 * @returns {void}
 */
function showError(message) {
    const error = document.getElementById("error-message")
    error.textContent = message;
    error.classList.remove("hidden")
}

/**
 * Clears and hides the error message.
 *
 * Resets the error message text and hides the error container.
 *
 * @returns {void}
 */
function clearError() {
    const error = document.getElementById("error-message")
    error.textContent = "";
    error.classList.add("hidden");
}