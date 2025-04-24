/**
 * Author: Panharith Menh
 * Target: enquire.html
 * Purpose: This file is enquiry form validation
 * Created: 15/04/2025
 * Last Modified:
 */

'use strict';

/**
 * Validates the first name and last name input.
 * - The name must be at least 3 characters long and a maximum of 25 characters.
 */
function validateFirstName() {
    const firstNameInput = document.getElementById('first_name');
    const nameRegex = /^[a-zA-Z\s-]{3,25}$/;
    return nameRegex.test(firstNameInput.value.trim());
}
function validateLastName() {
    const lastNameInput = document.getElementById('last_name');
    const nameRegex = /^[a-zA-Z\s-]{3,25}$/;
    return nameRegex.test(lastNameInput.value.trim());
}

/**
 * Validates the email input.
 * - The email must be in the format of a valid email address.
 * - The domain must be a valid domain with a 3-letter TLD (e.g., .com, .net, .org).
 * - The email must not contain any spaces or special characters.
 */
function validateEmail() {
    const emailInput = document.getElementById('email');
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3}$/;
    return emailRegex.test(emailInput.value.trim());
}

/**
 * Validates the phone number input.
 * - The phone number must match the Australian format:
 *   - Mobile: Starts with +61 followed by 9 digits (e.g., +61412345678)
 *   - Mobile: Starts with 04 followed by 8 digits (e.g., 0412345678)
 */
function validatePhoneNumber() {
    const phoneInput = document.getElementById('phone');
    const phoneRegex = /^(?:\+61|04)\d{8}$/; // Matches +61XXXXXXXXX or 04XXXXXXXX
    return phoneRegex.test(phoneInput.value.trim());
}

/**
 * Validates the state and postcode input.
 * - Ensures the postcode matches the selected state.
 * - The state must be selected from the dropdown.
 * - The postcode must be a 4-digit number.
 */
function validateStateAndPostcode() {
    const stateSelect = document.getElementById('state');
    const postcodeInput = document.getElementById('postcode');
    const stateError = document.getElementById('stateError');
    const postcodeError = document.getElementById('postcodeError');

    const statePostcodeMap = {
        VIC: /^3\d{3}|8\d{3}$/, // Victoria: 3000-3999, 8000-8999
        NSW: /^1\d{3}|2\d{3}$/, // New South Wales: 1000-1999, 2000-2999
        QLD: /^4\d{3}|9\d{3}$/, // Queensland: 4000-4999, 9000-9999
        NT: /^0\d{3}$/, // Northern Territory: 0800-0899
        WA: /^6\d{3}$/, // Western Australia: 6000-6999
        SA: /^5\d{3}$/, // South Australia: 5000-5999
        TAS: /^7\d{3}$/, // Tasmania: 7000-7999
        ACT: /^0\d{3}$/, // Australian Capital Territory: 0200-0299
    };
    let isValid = true;

    // Validate state selection
    if (stateSelect.value === '') {
        isValid = false;
        stateError.textContent = 'Please select a state.';
        stateError.style.display = 'block';
        stateSelect.focus(); // Focus on the state dropdown
    } else {
        stateError.textContent = '';
        stateError.style.display = 'none';
    }

    // Validate postcode length
    const postcodeValue = postcodeInput.value.trim();
    if (!/^\d{4}$/.test(postcodeValue)) {
        isValid = false;
        postcodeError.textContent = 'Postcode must be exactly 4 digits.';
        postcodeError.style.display = 'block';
        postcodeInput.focus(); // Focus on the postcode field
        return isValid; // Stop further validation if length is invalid
    } else {
        postcodeError.textContent = '';
        postcodeError.style.display = 'none';
    }

    // Validate postcode based on selected state
    const selectedState = stateSelect.value;
    if (selectedState && !statePostcodeMap[selectedState].test(postcodeValue)) {
        isValid = false;
        postcodeError.textContent = 'Invalid postcode for ' + selectedState + '.';
        postcodeError.style.display = 'block';
        postcodeInput.focus(); // Focus on the postcode field
    } else {
        postcodeError.textContent = '';
        postcodeError.style.display = 'none';
    }
    return isValid;
}

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('enquiryForm');
    const firstNameError = document.getElementById('firstNameError');
    const lastNameError = document.getElementById('lastNameError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');

    form.addEventListener('submit', function (event) {
        let isValid = true;

        // Validate first name
        const firstNameInput = document.getElementById('first_name');
        if (!validateFirstName()) {
            isValid = false;
            firstNameError.textContent = 'Please enter a valid first name (3-25 characters).';
            firstNameError.style.display = 'block';
            firstNameInput.focus(); // Focus on the first name field
        } else {
            firstNameError.textContent = '';
            firstNameError.style.display = 'none';
        }

        // Validate last name
        const lastNameInput = document.getElementById('last_name');
        if (!validateLastName()) {
            isValid = false;
            lastNameError.textContent = 'Please enter a valid last name (3-25 characters).';
            lastNameError.style.display = 'block';
            lastNameInput.focus(); // Focus on the last name field
        } else {
            lastNameError.textContent = '';
            lastNameError.style.display = 'none';
        }

        // Validate email
        const emailInput = document.getElementById('email');
        if (!validateEmail()) {
            isValid = false;
            emailError.textContent = 'Invalid email address!';
            emailError.style.display = 'block';
            emailInput.focus(); // Focus on the email field
        } else {
            emailError.textContent = '';
            emailError.style.display = 'none';
        }

        // Validate phone number
        const phoneInput = document.getElementById('phone');
        if (!validatePhoneNumber()) {
            isValid = false;
            phoneError.textContent = 'Please enter a valid Australian phone number (e.g., +61412345678 or 0412345678).';
            phoneError.style.display = 'block';
            phoneInput.focus(); // Focus on the phone number field
        } else {
            phoneError.textContent = '';
            phoneError.style.display = 'none';
        }

        // Validate state and postcode
        if (!validateStateAndPostcode()) {
            isValid = false;
        }

        // Call the validateCart function from add_to_cart.js
        if (typeof validateCart === 'function' && !validateCart()) {
            event.preventDefault(); // Prevent form submission if cart validation fails
            return;
        }

        if (!isValid) {
            event.preventDefault(); // Prevent form submission if validation fails
            return; // Stop further processing
        }

        // If validation passes, store data and redirect to payment.html
        const formData = new FormData(form);
        const formObject = {};

        // Convert form data to an object
        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        // Store data in local storage
        localStorage.setItem('enquiryFormData', JSON.stringify(formObject));

        // Redirect to payment.html
        window.location.href = 'payment.html';
    });
});
