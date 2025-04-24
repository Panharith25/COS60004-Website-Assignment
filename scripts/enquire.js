/**
 * Author: Panharith Menh
 * Target: enquire.html
 * Purpose: This file is enquiry form validation
 * Created: 15/04/2025
 * Last Modified: 22/04/2025
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
 * - The phone number must match the Australian format:
 *   - Mobile: Starts with +61 followed by 9 digits (e.g., +61412345678)
 *   - Mobile: Starts with 04 followed by 8 digits (e.g., 0412345678)
 */
// function validatePhoneNumber() {
//     const phoneInput = document.getElementById('phone');
//     const phoneRegex = /^(?:\+61|04)\d{8}$/; // Matches +61XXXXXXXXX or 04XXXXXXXX
//     return phoneRegex.test(phoneInput.value.trim());
// }
function validatePhoneNumber() {
    const phoneInput = document.getElementById('phone');
    const phoneRegex = /^(?:\+61-\d{3} \d{3} \d{3}|0\d{3} \d{3} \d{3})$/;
    // Matches +61-433 123 456 or 0433 123 456
    const phoneValue = phoneInput.value.trim();

    if (!phoneRegex.test(phoneValue)) {
        // Display an error message if the phone number is invalid
        const phoneError = document.getElementById('phoneError');
        phoneError.textContent = 'Invalid phone number format. Use +61-433 123 456 or 0433 123 456.';
        phoneError.style.display = 'block';
        return false;
    }

    // Hide the error message if the phone number is valid
    const phoneError = document.getElementById('phoneError');
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

    if (!isValid) {
        event.preventDefault();
        return false;
    }

    return true;
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
            alert('Please add at least one product to the cart before submitting.');
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

function saveFormDataToSession() {
    const formData = {
        first_name: document.getElementById('first_name').value.trim(),
        last_name: document.getElementById('last_name').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        state: document.getElementById('state').value,
        postcode: document.getElementById('postcode').value.trim(),
        total_price: document.getElementById('hidden_total_price').value,
        products: []
    };

    document.querySelectorAll('.cart_item').forEach(item => {
        const productId = item.getAttribute('data-id');
        // const productId = item.id; // Retrieve the id attribute of the checkbox
        const name = item.querySelector('span').textContent;
        const quantity = item.querySelector('.quantity_input').value;
        const price = item.querySelector('.quantity_input').getAttribute('data-price');

        // Add product details to the formData object
        formData.products.push({
            id: productId,
            name,
            price: parseFloat(price),
            quantity: parseInt(quantity)
        });
    });

    // Save to localStorage
    localStorage.setItem('enquiryFormData', JSON.stringify(formData));

    // Save to sessionStorage
    sessionStorage.setItem('enquiryFormData', JSON.stringify(formData));
}

function validateCart() {
    const cartItems = document.querySelectorAll('.cart_item');
    if (cartItems.length === 0) {
        alert('You must select at least one product/service.');
        return false;
    }

    for (const item of cartItems) {
        const quantity = parseInt(item.querySelector('.quantity_input').value, 10);
        if (isNaN(quantity) || quantity <= 0) {
            alert('Please ensure all selected products/services have a valid quantity.');
            return false;
        }
    }

    return true;
}

function init() {
    const payNowButton = document.getElementById('payNowButton');
    const phoneInput = document.getElementById('phone');

    payNowButton.addEventListener('click', function () {
        if (validateForm() && validateCart()) {
            // Show confirmation dialog
            const userConfirmed = confirm('Do you want to proceed to the payment page?');
            if (userConfirmed) {
                saveFormDataToSession();
                window.location.href = 'payment.html'; // Redirect to payment page
            } else {
                alert('You chose to stay on the current page.');
            }
        } else {
            alert('Please ensure all required fields are filled and a valid product/service is selected.');
        }
    });

    initFormValidation();
    initCart();
    // Add event listener for phone number formatting
    phoneInput.addEventListener('input', formatPhoneNumber);
}

window.onload = init;
