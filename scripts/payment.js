/**
 * Author: Panharith Menh
 * Target: payment.html
 * Purpose: This file is payment form validation
 * Created: 15/04/2025
 * Last Modified: 
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    // Retrieve the data from sessionStorage
    const enquiryData = JSON.parse(sessionStorage.getItem('enquiryFormData'));

    if (enquiryData) {
        const enquiryDetailsBody = document.getElementById('enquiryDetailsBody');

        // Add customer details
        const customerDetails = [
            { field: 'First Name', value: enquiryData.first_name },
            { field: 'Last Name', value: enquiryData.last_name },
            { field: 'Email', value: enquiryData.email },
            { field: 'Phone', value: enquiryData.phone },
            { field: 'State', value: enquiryData.state },
            { field: 'Postcode', value: enquiryData.postcode }
        ];

        customerDetails.forEach(detail => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${detail.field}</td>
                <td>${detail.value}</td>
            `;
            enquiryDetailsBody.appendChild(row);
        });

        // Add product details
        enquiryData.products.forEach((product, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>Product ${index + 1}</td>
                <td>
                    Name: ${product.name}, 
                    Quantity: ${product.quantity}, 
                    Price: $${parseFloat(product.price).toFixed(2)}
                </td>
            `;
            enquiryDetailsBody.appendChild(row);
        });

        // Add total price
        const totalPriceRow = document.createElement('tr');
        totalPriceRow.innerHTML = `
            <td><strong>Total Price</strong></td>
            <td><strong>$${parseFloat(enquiryData.total_price).toFixed(2)}</strong></td>
        `;
        enquiryDetailsBody.appendChild(totalPriceRow);
    } else {
        // If no data is found, display an error message
        const enquiryDetailsContainer = document.getElementById('enquiryDetailsContainer');
        enquiryDetailsContainer.innerHTML = `
            <p style="color: red;">No enquiry data found. Please go back to the enquiry page and fill out the form.</p>
        `;
    }
});

/**
 * Validates the payment form fields.
 * - Ensures all required fields are filled and valid.
 */
function validatePaymentForm() {
    let isValid = true;

    // Validate Credit Card Type
    const cardType = document.getElementById('card_type');
    const cardTypeError = document.getElementById('cardTypeError');
    if (!cardType.value) {
        cardTypeError.textContent = 'Please select a card type.';
        cardTypeError.style.display = 'block';
        isValid = false;
    } else {
        cardTypeError.style.display = 'none';
    }

    // Validate Name on Card
    const cardName = document.getElementById('card_name');
    const cardNameError = document.getElementById('cardNameError');
    if (!cardName.value.trim()) {
        cardNameError.textContent = 'Please enter the name on the card.';
        cardNameError.style.display = 'block';
        isValid = false;
    } else {
        cardNameError.style.display = 'none';
    }

    // Validate Card Number
    const cardNumber = document.getElementById('card_number');
    const cardNumberError = document.getElementById('cardNumberError');
    const cardTypeValue = cardType.value;

    // Remove spaces for validation
    const cardNumberValue = cardNumber.value.replace(/\s+/g, '');

    // Regular expressions for card types
    const cardPatterns = {
        visa: /^4[0-9]{12}(?:[0-9]{3})?$/, // Visa: Starts with 4, 13 or 16 digits
        mastercard: /^5[1-5][0-9]{14}$/,  // Mastercard: Starts with 51-55, 16 digits
        amex: /^3[47][0-9]{13}$/,         // Amex: Starts with 34 or 37, 15 digits
    };

    if (!cardPatterns[cardTypeValue]?.test(cardNumberValue)) {
        cardNumberError.textContent = `Please enter a valid ${cardTypeValue} card number.`;
        cardNumberError.style.display = 'block';
        isValid = false;
    } else {
        cardNumberError.style.display = 'none';
    }

    // Validate Expiry Date
    const expiryDate = document.getElementById('expiry_date');
    const expiryDateError = document.getElementById('expiryDateError');
    if (!/^\d{2}-\d{2}$/.test(expiryDate.value.trim())) {
        expiryDateError.textContent = 'Please enter a valid expiry date in MM-YY format.';
        expiryDateError.style.display = 'block';
        isValid = false;
    } else {
        expiryDateError.style.display = 'none';
    }

    // Validate CVV
    const cvv = document.getElementById('cvv');
    const cvvError = document.getElementById('cvvError');
    if (!/^\d{3}$/.test(cvv.value.trim())) {
        cvvError.textContent = 'Please enter a valid 3-digit CVV.';
        cvvError.style.display = 'block';
        isValid = false;
    } else {
        cvvError.style.display = 'none';
    }

    return isValid;
}

/**
 * Combines data from sessionStorage (enquire.html) and payment form,
 * then submits it to the PHP form.
 */
function submitToPHP(event) {
    event.preventDefault(); // Prevent default form submission

    // Validate the payment form
    if (!validatePaymentForm()) {
        return;
    }

    // Retrieve data from sessionStorage
    const enquiryData = JSON.parse(sessionStorage.getItem('enquiryFormData')) || {};

    // Retrieve payment form data
    const paymentData = {
        card_type: document.getElementById('card_type').value,
        card_name: document.getElementById('card_name').value.trim(),
        card_number: document.getElementById('card_number').value.trim(),
        expiry_date: document.getElementById('expiry_date').value.trim(),
        cvv: document.getElementById('cvv').value.trim(),
    };

    // Combine data
    const combinedData = { ...enquiryData, ...paymentData };

    // Create a hidden form to submit the data to the PHP form
    const form = document.createElement('form');
    form.method = 'post';
    form.action = 'http://mercury.swin.edu.au/it000000/formtest.php';

    for (const [key, value] of Object.entries(combinedData)) {
        if (key === 'products') {
            value.forEach((product, index) => {
                for (const [productKey, productValue] of Object.entries(product)) {
                    const input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = `products[${index}][${productKey}]`;
                    input.value = productValue;
                    form.appendChild(input);
                }
            });
        } else {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = value;
            form.appendChild(input);
        }
    }

    document.body.appendChild(form);
    form.submit();
}

function formatCardNumber(event) {
    const input = event.target;
    let value = input.value.replace(/\s+/g, ''); // Remove all spaces
    const formattedValue = value.match(/.{1,4}/g)?.join(' ') || ''; // Add spaces after every 4 digits
    input.value = formattedValue;
}

function handleCancelOrder() {
    // Retrieve the Cancel Order button
    const cancelOrderButton = document.getElementById('cancelOrderButton');

    // Add event listener for Cancel Order button
    cancelOrderButton.addEventListener('click', () => {
        // Confirm if the user wants to cancel the order
        const userConfirmed = confirm('Are you sure you want to cancel the order? All data will be cleared.');
        if (userConfirmed) {
            // Clear sessionStorage and localStorage
            sessionStorage.clear();
            localStorage.clear();

            // Redirect to the home page
            window.location.href = 'index.html';
        }
    });
}

function handleNavigationBarCancel() {
    const navLinks = document.querySelectorAll('.nav-link a');

    // Add event listener for all navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            const userConfirmed = confirm('Are you sure you want to cancel the order? All data will be cleared.');
            if (!userConfirmed) {
                event.preventDefault(); // Prevent navigation if the user cancels
            } else {
                sessionStorage.clear();
                localStorage.clear();
            }
        });
    });
}

function handleEnquireNavigation() {
    const enquireLink = document.querySelector('.nav-link a[href="enquire.html"]');

    // Add event listener for the Enquire link
    enquireLink.addEventListener('click', (event) => {
        const userConfirmed = confirm('If you go back to the Enquire page, your input data will remain.');
        if (!userConfirmed) {
            event.preventDefault(); // Prevent navigation if the user cancels
        } else {
            // Save product information to sessionStorage
            const cartItems = document.getElementById('cart_items');
            if (cartItems) {
                const products = [];
                cartItems.querySelectorAll('.cart_item').forEach(item => {
                    products.push({
                        id: item.getAttribute('data-id'),
                        name: item.querySelector('.product_name').textContent,
                        price: item.querySelector('.product_price').textContent,
                        quantity: item.querySelector('.product_quantity').textContent
                    });
                });
                sessionStorage.setItem('cartProducts', JSON.stringify(products));
            }
        }
    });
}

function init() {
    const paymentForm = document.getElementById('paymentForm');
    const cardNumberInput = document.getElementById('card_number');

    // Add event listener for form submission
    paymentForm.addEventListener('submit', submitToPHP);

    // Call the handleCancelOrder function
    handleCancelOrder();
    // Call handleNavigationBarCancel function
    handleNavigationBarCancel();
    // Call the handleEnquireNavigation function
    handleEnquireNavigation();

    // Add event listener for card number formatting
    cardNumberInput.addEventListener('input', formatCardNumber);
}

window.onload = init;
