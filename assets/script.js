"use strict";

const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");
const email = document.getElementById("email");
const checkbox = document.getElementById("checkbox");
const submitBtn = document.querySelector(".submit");
const textArea = document.querySelector("textarea");
const confirmationMSG = document.querySelector(".confirmation__message");
const query__errorMSG = document.querySelector(".query__error");
const message__error = document.querySelector(".message__error");
const errorMSG = document.querySelectorAll(".text__error");
const inputType = document.querySelectorAll("input");
const radioButtons = document.querySelectorAll("input[type= radio]");

//FUNCTION FOR ERROR HANDLING ON THE INPUT TYPES
const errorHandler = function (input, index) {
  input.style.border = "1px solid var(--red)";
  errorMSG[index].classList.remove("hidden");
};
const clearErrorHandler = function (input, index) {
  input.style.border = "";
  errorMSG[index].classList.add("hidden");
};

let checkValidation = [];
const addToValidation = (data) => {
  if (!checkValidation.includes(data)) {
    checkValidation.push(data);
  }
};
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // FIRSTNAME SELECTOR VALUE AND INDEX
  const firstnameValue = firstname.value.trim();
  const firstnameIndex = Array.from(inputType).indexOf(firstname);

  if (firstnameValue === "") {
    errorHandler(firstname, firstnameIndex);
  } else {
    clearErrorHandler(firstname, firstnameIndex);
    addToValidation(firstname);
  }

  // LASTNAME SELECTOR VALUE AND INDEX
  const lastnameValue = lastname.value.trim();
  const lastnameIndex = Array.from(inputType).indexOf(lastname);

  if (lastnameValue === "") {
    errorHandler(lastname, lastnameIndex);
  } else {
    clearErrorHandler(lastname, lastnameIndex);
    addToValidation(lastname);
  }
  // EMAIL SELECTOR VALUE, INDEX AND REGEX CODE
  const emailValue = email.value.trim();
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const emailIndex = Array.from(inputType).indexOf(email);

  if (!emailPattern.test(emailValue)) {
    errorHandler(email, emailIndex);
  } else {
    clearErrorHandler(email, emailIndex);
    addToValidation(email);
  }

  // QUERY TYPE VALIDATION
  const checkedOne = Array.from(radioButtons).some((x) => x.checked);
  if (checkedOne === false) {
    query__errorMSG.classList.remove("hidden");
  } else {
    query__errorMSG.classList.add("hidden");
    addToValidation(checkedOne);
  }

  // TEXTAREA VALIDATION
  if (textArea.value === "") {
    textArea.style.border = "1px solid var(--red)";
    message__error.classList.remove("hidden");
  } else {
    textArea.style.border = "";
    message__error.classList.add("hidden");
    addToValidation(textArea);
  }

  // CHECKBOX VALIDATION
  const checkboxIndex = Array.from(inputType).indexOf(checkbox);
  if (!checkbox.checked) {
    errorMSG[checkboxIndex].classList.remove("hidden");
  } else {
    errorMSG[checkboxIndex].classList.add("hidden");
    addToValidation(checkbox);
  }
  // SUCCESS VALIDATION
  if (checkValidation.length >= 6) {
    confirmationMSG.classList.remove("hidden");
    setTimeout(() => {
      confirmationMSG.classList.add("hidden");
    }, 5000);
  }
});

// IDENTIFY THE ACTIVE QUERY TYPE SELECTED
radioButtons.forEach((radio) => {
  radio.addEventListener("click", (e) => {
    radioButtons.forEach((activeradio) =>
      activeradio.closest(".query__box").classList.remove("addChecked")
    );
    e.target.closest(".query__box").classList.add("addChecked");
  });
});

