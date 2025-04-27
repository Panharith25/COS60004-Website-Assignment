/**
 * Author: Panharith Menh
 * Target: enquire.html
 * Purpose: This file is enquiry form validation and cart functionality for the enquiry form.
 * Created: 15/04/2025
 * Last Modified: 26/04/2025
 * Description: This file contains functions to validate the enquiry form fields, including first name, last name, 
 *               email, phone number, state and postcode, preferred contact method, street address, suburb, and comment. 
 *               It also handles the cart functionality for adding products to the cart and calculating the total price.
 */

'use strict';

/**
 * Validates the first name input.
 * - The name must be at least 3 characters long and a maximum of 25 characters.
 */
function validateFirstName() {
    const firstNameInput = document.getElementById('first_name');
    const nameRegex = /^[a-zA-Z\s-]{3,25}$/;
    return nameRegex.test(firstNameInput.value.trim());
}

/**
 * Validates the last name input.
 * - The name must be at least 3 characters long and a maximum of 25 characters.
 */
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
 * - The phone number must start with either +61 or 0.
 * - Format:
 *   - +61 followed by 9 digits (e.g., +61 433 345 678 or +61-433-345-678)
 *   - 0 followed by 9 digits (e.g., 0433 345 678 or 0433345678)
 */
function validatePhoneNumber() {
    const phoneInput = document.getElementById('phone');
    const phoneRegex = /^(?:\+61[- ]?\d{1,4}[- ]?\d{3}[- ]?\d{3}|0\d{1,4}[- ]?\d{3}[- ]?\d{3})$/; // Matches +61-433 123 456 or 0433 123 456
    const phoneValue = phoneInput.value.trim();

    const phoneError = document.getElementById('phoneError');

    if (!phoneRegex.test(phoneValue)) {
        // Display an error message if the phone number is invalid
        phoneError.textContent = 'Invalid phone number format. Use +61 433 345 678 or 0433 345 678.';
        phoneError.style.display = 'block';
        return false;
    }

    // Hide the error message if the phone number is valid
    phoneError.textContent = '';
    phoneError.style.display = 'none';
    return true;
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
        NT: /^0\d{3}$/,         // Northern Territory: 0800-0899
        WA: /^6\d{3}$/,         // Western Australia: 6000-6999
        SA: /^5\d{3}$/,         // South Australia: 5000-5999
        TAS: /^7\d{3}$/,        // Tasmania: 7000-7999
        ACT: /^0\d{3}$/,        // Australian Capital Territory: 0200-0299
    };

    let isValid = true;
    const postcodeValue = postcodeInput.value.trim();
    const selectedState = stateSelect.value;

    // Validate state selection
    if (selectedState === '') {
        isValid = false;
        stateError.textContent = 'Please select a state.';
        stateError.style.display = 'block';
        stateSelect.focus(); // Focus on the state dropdown
    } else {
        stateError.textContent = '';
        stateError.style.display = 'none';
    }

    // Validate postcode length
    if (!/^\d{4}$/.test(postcodeValue)) {
        isValid = false;
        postcodeError.textContent = 'Postcode must be exactly 4 digits.';
        postcodeError.style.display = 'block';
        postcodeInput.focus(); // Focus on the postcode field
        return isValid; // Stop further validation if length is invalid
    } else if (!statePostcodeMap[selectedState].test(postcodeValue)) { // Validate postcode based on selected state
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

// validation form function
function validateForm(event) {
    const firstNameError = document.getElementById('firstNameError');
    const lastNameError = document.getElementById('lastNameError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');
    const preferredContactError = document.getElementById('preferredContactError');
    const streetError = document.getElementById('streetError');
    const suburbError = document.getElementById('suburbError');
    const commentError = document.getElementById('commentError');

    let isValid = true;

    // Validate first name
    if (!validateFirstName()) {
        isValid = false;
        firstNameError.textContent = 'Please enter a valid first name (3-25 characters).';
        firstNameError.style.display = 'block';
        document.getElementById('first_name').focus(); // Focus on the first name field
    } else {
        firstNameError.textContent = '';
        firstNameError.style.display = 'none';
    }

    // Validate last name
    if (!validateLastName()) {
        isValid = false;
        lastNameError.textContent = 'Please enter a valid last name (3-25 characters).';
        lastNameError.style.display = 'block';
        document.getElementById('last_name').focus(); // Focus on the last name field
    } else {
        lastNameError.textContent = '';
        lastNameError.style.display = 'none';
    }

    // Validate email
    if (!validateEmail()) {
        isValid = false;
        emailError.textContent = 'Invalid email address!';
        emailError.style.display = 'block';
        document.getElementById('email').focus(); // Focus on the email field
    } else {
        emailError.textContent = '';
        emailError.style.display = 'none';
    }

    // Validate phone number
    if (!validatePhoneNumber()) {
        isValid = false;
        phoneError.textContent = 'Please enter a valid Australian phone number (e.g., +61-433 123 456 or 0433 123 456).';
        phoneError.style.display = 'block';
        document.getElementById('phone').focus(); // Focus on the phone number field
    } else {
        phoneError.textContent = '';
        phoneError.style.display = 'none';
    }

    // Validate state and postcode
    if (!validateStateAndPostcode()) {
        isValid = false;
    }

    // Validate preferred contact
    const preferredContact = document.getElementById('preferred_contact').value;
    if (preferredContact === '') {
        isValid = false;
        preferredContactError.textContent = 'Please select a preferred contact method.';
        preferredContactError.style.display = 'block';
        document.getElementById('preferred_contact').focus();
    } else {
        preferredContactError.textContent = '';
        preferredContactError.style.display = 'none';
    }

    // Validate street address
    const street = document.getElementById('street').value.trim();
    if (street === '') {
        isValid = false;
        streetError.textContent = 'Please enter a valid street address.';
        streetError.style.display = 'block';
        document.getElementById('street').focus();
    } else {
        streetError.textContent = '';
        streetError.style.display = 'none';
    }

    // Validate suburb
    const suburb = document.getElementById('suburb').value.trim();
    if (suburb === '') {
        isValid = false;
        suburbError.textContent = 'Please enter a valid suburb or town.';
        suburbError.style.display = 'block';
        document.getElementById('suburb').focus();
    } else {
        suburbError.textContent = '';
        suburbError.style.display = 'none';
    }

    // Validate comment
    const comment = document.getElementById('comment').value.trim();
    if (comment === '') {
        isValid = false;
        commentError.textContent = 'Please enter a comment.';
        commentError.style.display = 'block';
        document.getElementById('comment').focus();
    } else {
        commentError.textContent = '';
        commentError.style.display = 'none';
    }

    // Prevent form submission if validation fails
    if (!isValid && event) {
        event.preventDefault();
    }
    return isValid;
}

// Add carts validation form
function initFormValidation() {
    const form = document.getElementById('enquiryForm');

    form.addEventListener('submit', (event) => {
        let isValid = true;

        // Validate at least one product is added to the cart
        const cartItems = document.getElementById('cart_items');
        if (cartItems.children.length === 0) {
            isValid = false;
            alert('Please add at least one product to the cart before checking out.');
        }

        // Validate the form before allowing product selection
        if (!validateForm()) {
            alert('Please ensure all required fields are filled out correctly before adding products to the cart.');
            return;
        }

        if (!isValid) {
            event.preventDefault();
        }
    });
}

// Add cart function initialization
function initCart() {
    const form = document.getElementById('enquiryForm');
    const addProductsButton = document.getElementById('add_products_button');
    const productSelectionModal = document.getElementById('product_selection_modal');
    const addToCartButton = document.getElementById('add_to_cart_button');
    const cancelButton = document.getElementById('cancel_button');
    const cartBox = document.getElementById('cart_box');
    const cartItems = document.getElementById('cart_items');
    const totalPriceElement = document.getElementById('total_price');
    const hiddenInputsContainer = document.getElementById('hidden_inputs_container');
    const hiddenTotalPriceInput = document.getElementById('hidden_total_price');

    // Show product selection modal when "Add Products" button is clicked
    addProductsButton.addEventListener('click', () => {
        

        const checkboxes = document.querySelectorAll('input[type="checkbox"][name="product_name"]');
        let availableProducts = 0;

        // Hide checkboxes for products already in the cart
        checkboxes.forEach((checkbox) => {
            const productId = checkbox.id;
            const cartItem = cartItems.querySelector(`.cart_item[data-id="${productId}"]`);
            checkbox.parentElement.style.display = cartItem ? 'none' : 'block'; // Hide or Show the product
            if (!cartItem) availableProducts++;
        });

        if (availableProducts === 0) {
            alert('No more products available to add.'); // Alert user when no more items on the menu
        } else {
            addProductsButton.textContent = 'Adding Products...'; // Change button to text and disable it
            addProductsButton.disabled = true;
            productSelectionModal.style.display = 'block';
        }
    });

    // Add selected products to cart
    addToCartButton.addEventListener('click', () => {
        const selectedProducts = document.querySelectorAll('input[type="checkbox"][name="product_name"]:checked');

        selectedProducts.forEach((checkbox) => {
            const productId = checkbox.id;
            const productName = checkbox.value;
            const productPrice = parseFloat(checkbox.getAttribute('data-price'));

            // Check if the product is already in the cart
            let cartItem = cartItems.querySelector(`.cart_item[data-id="${productId}"]`);
            if (!cartItem) {
                // Add new product to the cart table
                cartItem = document.createElement('div');
                cartItem.classList.add('cart_item');
                cartItem.setAttribute('data-id', productId);
                cartItem.innerHTML = `
                    <span>${productName} ($${productPrice.toFixed(2)})</span>
                    <input type="number" class="quantity_input" min="1" max="10" value="1" data-price="${productPrice}">
                    <button type="button" class="remove_button">Remove</button>
                `;
                cartItems.appendChild(cartItem);
                cartBox.style.display = 'block';

                hiddenInputsContainer.innerHTML += `
                    <input type="hidden" name="products[${productId}][name]" value="${productName}">
                    <input type="hidden" name="products[${productId}][price]" value="${productPrice}">
                    <input type="hidden" name="products[${productId}][quantity]" value="1">
                `;
            }

            // Uncheck the checkbox after adding to the cart
            checkbox.checked = false;
        });

        productSelectionModal.style.display = 'none'; // Hide the product selection modal
        addProductsButton.textContent = 'Add Products'; // Reset the "Add Products" button
        addProductsButton.disabled = false;

        calculateTotalPrice(); // Calculate the total price depending on the amount of items added
    });

    // Hide product selection modal and reset checkboxes when "Cancel" button is clicked
    cancelButton.addEventListener('click', () => {
        document.querySelectorAll('input[type="checkbox"][name="product_name"]').forEach(cb => cb.checked = false);
        productSelectionModal.style.display = 'none'; // Hide the cart table
        addProductsButton.textContent = 'Add Products'; // Reset the "Add Products" button
        addProductsButton.disabled = false;
    });

    // Remove product from cart
    cartItems.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove_button')) {
            const cartItem = event.target.closest('.cart_item');
            const productId = cartItem.getAttribute('data-id');
            cartItems.removeChild(cartItem);

            // Show the product back in the cart modal table
            const checkbox = document.getElementById(productId);
            if (checkbox) checkbox.parentElement.style.display = 'block';

            if (cartItems.children.length === 0) {
                cartBox.style.display = 'none';
            }

            calculateTotalPrice();
        }
    });

    // Update quantity and recalculate price
    cartItems.addEventListener('input', (event) => {
        if (event.target.classList.contains('quantity_input')) {
            const quantityInput = event.target;
            const productId = quantityInput.closest('.cart_item').getAttribute('data-id');
            const hiddenQuantityInput = document.querySelector(`input[name="products[${productId}][quantity]"]`);
            if (hiddenQuantityInput) {
                hiddenQuantityInput.value = quantityInput.value; // Update hidden input with new quantity
            }
            calculateTotalPrice(); // Calculate total price
        }
    });

    // Function to calculate the total price
    function calculateTotalPrice() {
        let total = 0;
        document.querySelectorAll('.quantity_input').forEach(input => {
            const price = parseFloat(input.getAttribute('data-price'));
            const quantity = parseInt(input.value, 10) || 0;
            total += price * quantity; // Multiply price by quantity
        });
        totalPriceElement.textContent = `$${total.toFixed(2)}`; // Update total price display
        if (hiddenTotalPriceInput) hiddenTotalPriceInput.value = total.toFixed(2);
    }

    // Reset form
    form.addEventListener('reset', () => {
        cartItems.innerHTML = ''; // Clear the cart items
        hiddenInputsContainer.innerHTML = ''; // Remove all hidden inputs
        cartBox.style.display = 'none'; // Hide the cart box
        totalPriceElement.textContent = '$0.00'; // Reset the total price
        
        // Reset the hidden total price input
        if (hiddenTotalPriceInput) hiddenTotalPriceInput.value = '0.00';
    });
}

// Store form data to sessionStorage and localStorage. then redirect to payment page
function handeleEnquiryFormSubmission() {
    // Collect form data
    const formData = {
        first_name: document.getElementById('first_name').value.trim(),
        last_name: document.getElementById('last_name').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        preferred_contact: document.getElementById('preferred_contact').value,
        street: document.getElementById('street').value.trim(),
        suburb: document.getElementById('suburb').value.trim(),
        state: document.getElementById('state').value,
        postcode: document.getElementById('postcode').value.trim(),
        comment: document.getElementById('comment').value.trim(),
        total_price: document.getElementById('hidden_total_price').value,
        products: [], // Store product details here, but this data can't be shown on PHP page as it is written as an array
    };

    // So, I will save the product details as individual keys in the formData object
    // This way, the data can be accessed easily in PHP without needing to parse an array.
    // Collect product data from the cart
    let productIndex = 1; // Start indexing products from 1
    document.querySelectorAll('.cart_item').forEach(item => {
        const productName = item.querySelector('span').textContent.trim(); // Get product name and price
        const productQuantity = item.querySelector('.quantity_input').value.trim(); // Get product quantity

        // Save product details as individual keys
        formData[`product_${productIndex}_name`] = productName;
        formData[`product_${productIndex}_quantity`] = productQuantity;

        productIndex++;
    });

    // Collect product data from the cart
    document.querySelectorAll('.cart_item').forEach(item => {
        const productName = item.querySelector('span').textContent;
        const productPrice = parseFloat(item.querySelector('.quantity_input').getAttribute('data-price'));
        const productQuantity = parseInt(item.querySelector('.quantity_input').value, 10);

        // Format: "DualSense Wireless Controller ($99.99) 2"
        const productDetails = `${productName} ($${productPrice.toFixed(2)}) ${productQuantity}`;
        formData.products.push(productDetails);
    });

    // Save to localStorage
    localStorage.setItem('enquiryFormData', JSON.stringify(formData));

    // Save form data to localStorage or sessionStorage
    sessionStorage.setItem('enquiryFormData', JSON.stringify(formData));

    // Redirect to the payment page
    window.location.href = enquiryForm.action;
}

function validateCart() {
    // Validate the form before allowing product selection
    if (!validateForm()) {
        alert('Please ensure all required fields are filled out correctly before adding products to the cart.');
        return;
    }
    const cartItems = document.querySelectorAll('.cart_item');
    if (cartItems.length === 0) {
        alert('You must select at least one product/service.');
        return false;
    }

    return true;
}

function init() {
    const payNowButton = document.getElementById('payNowButton');
    const form = document.getElementById('enquiryForm');

    payNowButton.addEventListener('click', function (event) {
        // Prevent default form submission
        event.preventDefault();

        // Validate form and cart
        if (validateForm() && validateCart()) {
            // Show confirmation dialog
            const userConfirmed = confirm('Do you want to proceed to the payment page?');
            if (userConfirmed) {
                // Handle form submission
                handeleEnquiryFormSubmission();
                form.submit(); // Submit the form programmatically
            } else {
                alert('You chose to stay on the current page.');
            }
        } else {
            alert('Please ensure all required fields are filled and a valid product/service is selected.');
        }
    });

    initFormValidation();
    initCart();
}

window.onload = init;
