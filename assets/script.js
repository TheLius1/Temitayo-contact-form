"use strict";

const email = document.getElementById("email");
const checkbox = document.getElementById("checkbox");
const submitBtn = document.querySelector(".submit");
const textArea = document.querySelector("textarea");
const confirmationMSG = document.querySelector(".confirmation__message");
const query__errorMSG = document.querySelector(".query__error");
const message__error = document.querySelector(".message__error");
const errorMSG = document.querySelectorAll(".text__error");
const nameInput = document.querySelectorAll(".nameInput");
const inputType = document.querySelectorAll("input");
const radioButtons = document.querySelectorAll("input[type= radio]");

let isValid = true;

//FUNCTION FOR ERROR HANDLING ON THE INPUT TYPES
const errorHandler = function (input, index) {
  input.style.border = "1px solid var(--red)";
  errorMSG[index].classList.remove("hidden");
  isValid = false;
};
const clearErrorHandler = function (input, index) {
  input.style.border = "";
  errorMSG[index].classList.add("hidden");
  isValid = true;
};

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // FIRSTNAME && LASTNAME VALIDATION
  nameInput.forEach((name, i) => {
    if (name.value === "") {
      errorHandler(name, i);
    } else {
      clearErrorHandler(name, i);
    }
  });

  // EMAIL VALIDATION
  const emailValue = email.value.trim();
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const emailIndex = Array.from(inputType).indexOf(email);
  if (!emailPattern.test(emailValue)) {
    errorHandler(email, emailIndex);
  } else {
    clearErrorHandler(email, emailIndex);
  }

  // QUERY TYPE VALIDATION
  const checkedOne = Array.from(radioButtons).some((x) => x.checked);
  if (checkedOne === false) {
    query__errorMSG.classList.remove("hidden");
    isValid = false;
  } else {
    query__errorMSG.classList.add("hidden");
    isValid = true;
  }

  // TEXTAREA VALIDATION
  if (textArea.value === "") {
    textArea.style.border = "1px solid var(--red)";
    message__error.classList.remove("hidden");
    isValid = false;
  } else {
    textArea.style.border = "";
    message__error.classList.add("hidden");
    isValid = true;
  }

  // CHECKBOX VALIDATION
  const checkboxIndex = Array.from(inputType).indexOf(checkbox);
  if (!checkbox.checked) {
    errorMSG[checkboxIndex].classList.remove("hidden");
    isValid = false;
  } else {
    errorMSG[checkboxIndex].classList.add("hidden");
    isValid = true;
  }

  // SUCCESS VALIDATION
  if (isValid) {
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
