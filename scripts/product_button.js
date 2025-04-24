/**
 * Author: Panharith Menh
 * Target: sections folder, topic-1.html and topic-2.html
 * Purpose: This file is for button click events to change images
 * Created: 15/04/2025
 * Last Modified: 15/04/2025
 */

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