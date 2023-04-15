"use strict";

// TODO:
// - View an age in years, months, and days after submitting a valid date through the form ✅
// - Receive validation errors if:
//   - Any field is empty when the form is submitted ✅
//   - The day number is not between 1-31 ✅
//   - The month number is not between 1-12 ✅
//   - The year is in the future ✅
//   - The date is invalid e.g. 31/04/1991 (there are 30 days in April) ✅
// - View the optimal layout for the interface depending on their device's screen size ✅
// - See hover and focus states for all interactive elements on the page ✅

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
const MONTH30 = 30;
const MONTH31 = 31;
const MONTH28 = 28;

const CURRENT_DATE = new Date();
const CURRENT_YEAR = CURRENT_DATE.getFullYear();

const CURRENT_MONTH = CURRENT_DATE.getMonth() + 1;
const CURRENT_DAY = CURRENT_DATE.getDate();
// DATA TO BE DISPLAY TRHOUG THESE SELECTIONS
const YearData = document.querySelector(".years");
const MonthData = document.querySelector(".months");
const DayData = document.querySelector(".days");

const ALL_MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const MONTHS_30_DAYS = ["April", "June", "September", "November"];

const MONTHS_31_DAYS = [
  "January",
  "March",
  "May",
  "July",
  "August",
  "October",
  "December",
];
const EXCEPTION_MONTH = ["February"];

// TODO: still a bug in the calculation of the age its returning negative months in sum scenarios?

// making sure once the page loads all the alert messages have a hidden class
alertMessage.forEach((message) =>
  message.classList.add("validation-message-hidden")
);

// Event Handlers
// TODO: find a way to remove the error messages and labels once the user types in any of the input fields or meets the conditions?
const submitForm = () => {
  // helper function for validation
  const validInputs = (...inputs) => {
    return inputs.every((inp) => Number.isFinite(inp));
  };

  const allPositives = (...inputs) => {
    return inputs.every((input) => input > 0);
  };

  const displayErrorMessage = (alertMsg, messageContent) => {
    alertMsg.forEach((message) => {
      message.classList.remove("validation-message-hidden");
      message.textContent = messageContent;
    });
  };
  const displayErrorOnInput = (...inputs) => {
    inputs.forEach((input) => {
      input.classList.add("outline-error");
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

  const removeErrorMessages = (alertMsg, ...inputs) => {
    allLabels.forEach((label) => label.classList.remove("error"));
    alertMsg.forEach((message) => {
      message.textContent = "";
      message.classList.remove("validation-message-hidden");
    });
    inputs.forEach((input) => {
      input.classList.remove("outline-error");
      input.value = "";
    });
  };

  const checkMonth = (monthIndex) => {
    // getting the month Index so we can extract the month name from the array of months
    const monthName = ALL_MONTHS[monthIndex - 1];
    // first checking wether the month inserted matches a month from the months that have 30 days in them
    if (MONTHS_30_DAYS.includes(monthName)) {
      if (day > MONTH30) {
        displayErrorMessage(
          alertMessage,
          "Please enter a day less than or equal 30"
        );
        displayErrorOnInput(inputDay, inputMonth, inputYear);
        displayErrorOnLabel();
        return;
      }
    }

    if (MONTHS_31_DAYS.includes(monthName)) {
      if (day > MONTH31) {
        displayErrorMessage(
          alertMessage,
          "Please enter a day less than or equal 31"
        );
        displayErrorOnInput(inputDay, inputMonth, inputYear);
        displayErrorOnLabel();
        return;
      }
    }

    if (EXCEPTION_MONTH.includes(monthName)) {
      if (day > MONTH28) {
        displayErrorMessage(
          alertMessage,
          "Please enter a day less than or equal 28"
        );
        displayErrorOnInput(inputDay, inputMonth, inputYear);
        displayErrorOnLabel();
        return;
      }
    }

    if (
      allPositives(day, month, year) &&
      validInputs(day, month, year) &&
      day < MAX_DAYS &&
      month < MAX_MONTHS &&
      year <= CURRENT_YEAR
    ) {
      removeErrorMessages(alertMessage, inputDay, inputMonth, inputYear);
      const calcAge = function (birthday) {
        let birthdate = new Date(birthday);
        console.log(birthdate);
        let YEARS = CURRENT_DATE.getFullYear() - birthdate.getFullYear();
        let MONTHS = CURRENT_DATE.getMonth() - birthdate.getMonth();
        let DAYS = CURRENT_DATE.getDate() - birthdate.getDate();
        // If the birthdate month and day are after the current month and day,
        // subtract one year from the age

        if (MONTHS < 0 || (MONTHS === 0 && DAYS < 0)) {
          YEARS--;
          if (MONTHS === 0) {
            MONTHS = 11;
          } else {
            MONTHS = 12 + MONTHS;
          }
          DAYS = 30 + DAYS;
        }

        YearData.textContent = YEARS;
        MonthData.textContent = MONTHS;
        DayData.textContent = DAYS;
      };
      calcAge(`${month}/${day}/${year}`);
    }
  };
  const day = +inputDay.value;
  const month = +inputMonth.value;
  const year = +inputYear.value;
  if (day > MAX_DAYS || month > MAX_MONTHS || year > CURRENT_YEAR) {
    displayErrorOnInput(inputDay, inputMonth, inputYear);
    errorMessageForInputsGreatedThan(alertMessage);
  }

  if (!allPositives(day, month, year) || !validInputs(day, month, year)) {
    displayErrorMessage(alertMessage, "This field is required.");
    displayErrorOnInput(inputDay, inputMonth, inputYear);
    displayErrorOnLabel();
  }
  checkMonth(month);
};

// Event Listeners
submitButton.addEventListener("click", submitForm);
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    submitForm();
  }
});
