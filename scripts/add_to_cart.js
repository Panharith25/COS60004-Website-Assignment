/**
 * Author: Panharith Menh
 * Target: enquire.html
 * Purpose: This file is enquiry form for adding products to cart
 * Created: 21/04/2025
 * Last Modified:
 */

'use strict';

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('enquiryForm'); // Access the form element
    const addProductsButton = document.getElementById('add_products_button');
    const productSelectionModal = document.getElementById('product_selection_modal');
    const addToCartButton = document.getElementById('add_to_cart_button');
    const cancelButton = document.getElementById('cancel_button');
    const cartBox = document.getElementById('cart_box');
    const cartItems = document.getElementById('cart_items');
    const totalPriceElement = document.getElementById('total_price');

    // Show product selection modal when "Add Products" button is clicked
    addProductsButton.addEventListener('click', function () {
        const checkboxes = document.querySelectorAll('input[type="checkbox"][name="product_name"]');
        let availableProducts = 0;

        // Hide checkboxes for products already in the cart
        checkboxes.forEach((checkbox) => {
            const productId = checkbox.id;
            const cartItem = cartItems.querySelector(`.cart_item[data-id="${productId}"]`);
            if (cartItem) {
                checkbox.parentElement.style.display = 'none'; // Hide the product
            } else {
                checkbox.parentElement.style.display = 'block'; // Show the product
                availableProducts++;
            }
        });

        if (availableProducts === 0) {
            alert('No more products available to add.');
        } else {
            // Change button to text and disable it
            addProductsButton.textContent = 'Adding Products...';
            addProductsButton.disabled = true;

            productSelectionModal.style.display = 'block';
        }
    });

    // Add selected products to the cart
    addToCartButton.addEventListener('click', function () {
        const selectedProducts = document.querySelectorAll('input[type="checkbox"][name="product_name"]:checked');
        const hiddenInputsContainer = document.getElementById('hidden_inputs_container'); // Reference the container
    
        selectedProducts.forEach((checkbox) => {
            const productId = checkbox.id;
            const productName = checkbox.value;
            const productPrice = parseFloat(checkbox.getAttribute('data-price'));
    
            // Check if the product is already in the cart
            let cartItem = cartItems.querySelector(`.cart_item[data-id="${productId}"]`);
            if (!cartItem) {
                // Add new product to the cart
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
    
                // Add hidden inputs for the product
                const hiddenInputName = document.createElement('input');
                hiddenInputName.type = 'hidden';
                hiddenInputName.name = `products[${productId}][name]`;
                hiddenInputName.value = productName;
                hiddenInputsContainer.appendChild(hiddenInputName);
    
                const hiddenInputPrice = document.createElement('input');
                hiddenInputPrice.type = 'hidden';
                hiddenInputPrice.name = `products[${productId}][price]`;
                hiddenInputPrice.value = productPrice;
                hiddenInputsContainer.appendChild(hiddenInputPrice);
    
                const hiddenInputQuantity = document.createElement('input');
                hiddenInputQuantity.type = 'hidden';
                hiddenInputQuantity.name = `products[${productId}][quantity]`;
                hiddenInputQuantity.value = 1; // Default quantity
                hiddenInputsContainer.appendChild(hiddenInputQuantity);
            }

            // Uncheck the checkbox after adding to the cart
            checkbox.checked = false;
        });

        // Hide the product selection modal
        productSelectionModal.style.display = 'none';

        // Reset the "Add Products" button
        addProductsButton.textContent = 'Add Products';
        addProductsButton.disabled = false;

        // Recalculate the total price
        calculateTotalPrice();
    });

    // Hide product selection modal and reset checkboxes when "Cancel" button is clicked
    cancelButton.addEventListener('click', function () {
        const checkboxes = document.querySelectorAll('input[type="checkbox"][name="product_name"]');
        checkboxes.forEach((checkbox) => {
            checkbox.checked = false; // Reset all checkboxes
        });

        // Hide the modal
        productSelectionModal.style.display = 'none';

        // Reset the "Add Products" button
        addProductsButton.textContent = 'Add Products';
        addProductsButton.disabled = false;
    });

    // Remove product from the cart
    cartItems.addEventListener('click', function (event) {
        if (event.target.classList.contains('remove_button')) {
            const cartItem = event.target.closest('.cart_item');
            const productId = cartItem.getAttribute('data-id');
            cartItems.removeChild(cartItem);

            // Show the product back in the modal
            const checkbox = document.getElementById(productId);
            if (checkbox) {
                checkbox.parentElement.style.display = 'block';
            }

            if (cartItems.children.length === 0) {
                cartBox.style.display = 'none';
            }
            calculateTotalPrice();
        }
    });

    // Update total price when quantity changes
    cartItems.addEventListener('input', function (event) {
        if (event.target.classList.contains('quantity_input')) {
            const quantityInput = event.target;
            const productId = quantityInput.closest('.cart_item').getAttribute('data-id');
            const hiddenQuantityInput = cartItems.querySelector(`input[name="products[${productId}][quantity]"]`);
            if (hiddenQuantityInput) {
                hiddenQuantityInput.value = quantityInput.value; // Update hidden input with new quantity
            }
            calculateTotalPrice(); // Recalculate total price
        }
    });

    // Function to calculate the total price
    function calculateTotalPrice() {
        let totalPrice = 0;
        const quantities = cartItems.querySelectorAll('.quantity_input');
        quantities.forEach((input) => {
            const price = parseFloat(input.getAttribute('data-price'));
            const quantity = parseInt(input.value, 10) || 0;
            totalPrice += price * quantity; // Multiply price by quantity
        });
        totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`; // Update total price display

        // Update the hidden input for total price
        const hiddenTotalPriceInput = document.getElementById('hidden_total_price');
        hiddenTotalPriceInput.value = totalPrice.toFixed(2);
    }

    // Add an event listener for the reset button
    form.addEventListener('reset', function () {
        // Clear the cart items
        cartItems.innerHTML = '';
        cartBox.style.display = 'none';

        // Remove all hidden inputs
        hiddenInputsContainer.innerHTML = '';

        // Reset the total price
        totalPriceElement.textContent = '$0.00';
    });

    // Add validation to ensure at least one product is added to the cart
    form.addEventListener('submit', function (event) {
        let isValid = true;

        // Check if there are any products in the cart
        if (cartItems.children.length === 0) {
            isValid = false;
            alert('Please add at least one product to the cart before submitting.');
        }

        if (!isValid) {
            event.preventDefault(); // Prevent form submission if validation fails
        }
    });
});
