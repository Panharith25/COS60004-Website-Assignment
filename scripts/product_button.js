/**
 * Author: Panharith Menh
 * Target: sections folder, topic-1.html and topic-2.html
 * Purpose: This file is for button click events to change images
 * Created: 15/04/2025
 * Last Modified: 17/04/2025
 * Description: This script handles the click events for color selection buttons. When a button is clicked, it removes the "active" class 
 *               from all buttons and images, then adds the "active" class to the clicked button and the corresponding image. The images 
 *               are identified by a data attribute that matches the button's data attribute.
 */

'use strict';

// Function to handle button click events for changing images
document.addEventListener("DOMContentLoaded", function () {
    const colorInputs = document.querySelectorAll(".color_choose input");

    colorInputs.forEach(function(input) {
        input.addEventListener("click", function() {
            const controllerColor = this.getAttribute("data-image");

            //Remove "active" class from the currently active elements
            document.querySelectorAll(".active").forEach(function(activeElement) {
                activeElement.classList.remove("active");
            });

            // Add "active" class to the corresponding image
            const targetImage = document.querySelector('.left_column img[data-image="' + controllerColor + '"]');
            if (targetImage) {
                targetImage.classList.add("active");
            }

            // Add "active" class to the clicked input
            this.classList.add("active");
        });
    });
});