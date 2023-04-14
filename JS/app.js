"use strict";

// TODO:
// - View an age in years, months, and days after submitting a valid date through the form
// - Receive validation errors if:
//   - Any field is empty when the form is submitted ✅
//   - The day number is not between 1-31 ✅
//   - The month number is not between 1-12 ✅
//   - The year is in the future ✅
//   - The date is invalid e.g. 31/04/1991 (there are 30 days in April)
// - View the optimal layout for the interface depending on their device's screen size
// - See hover and focus states for all interactive elements on the page

// Selections
const submitButton = document.querySelector(".container__submit-btn");
const form = document.querySelector("form");
const inputDay = document.querySelector('input[name="day"]');
const inputMonth = document.querySelector('input[name="month"]');
const inputYear = document.querySelector('input[name="year"]');
const allInputs = [...document.querySelectorAll("form input")];
const allLabels = [...document.querySelectorAll("label")];
const alertMessage = document.querySelectorAll(".validation-message");
const MAX_MONTHS = 12;
const MAX_DAYS = 31;
const CURRENT_YEAR = new Date().getFullYear();

alertMessage.forEach((message) =>
  message.classList.add("validation-message-hidden")
);

// Event Handlers
const submitForm = (e) => {
  e.preventDefault();
  // helper function for validation
  const validInputs = (...inputs) => {
    return inputs.every((inp) => Number.isFinite(inp));
  };

  const allPositives = (...inputs) => {
    return inputs.every((input) => input > 0);
  };

  const displayErrorMessage = (alertMsg) => {
    alertMsg.forEach((message) => {
      message.classList.remove("validation-message-hidden");
      message.textContent = "This field is required.";
    });
  };
  const displayErrorOnInput = (...inputs) => {
    inputs.forEach((input) => {
      input.style.outline = "1px solid hsl(0, 100%, 67%)";
    });
  };
  const displayErrorOnLabel = () => {
    allLabels.forEach((label) => {
      label.classList.add("error");
    });
  };
  const errorMessageForInputsGreatedThan = (alertMsg) => {
    alertMsg.forEach((message) => {
      message.classList.remove("validation-message-hidden");
      const inputLabelTargetParent =
        message.parentElement.children[0].dataset.name;
      message.textContent = `Must be a valid ${inputLabelTargetParent}`;
    });
  };

  const target = e.target.closest(".container__submit-btn");
  if (!target) return;
  const day = +inputDay.value;
  const month = +inputMonth.value;
  const year = +inputYear.value;
  if (day > MAX_DAYS || month > MAX_MONTHS || year > CURRENT_YEAR) {
    displayErrorOnInput(inputDay, inputMonth, inputYear);
    errorMessageForInputsGreatedThan(alertMessage);
  }
  if (!allPositives(day, month, year) || !validInputs(day, month, year)) {
    displayErrorMessage(alertMessage);
    displayErrorOnInput(inputDay, inputMonth, inputYear);
    displayErrorOnLabel();
  }
};
// TODO: find a way to remove the error messages and labels once the user types in any of the input fields or meets the conditions?
const clearErrorMessages = () => {
  allInputs.forEach((input) => {
    input.style.outline = "0px solid hsl(0, 100%, 67%)";
  });
};
// Event Listeners
submitButton.addEventListener("click", submitForm);
