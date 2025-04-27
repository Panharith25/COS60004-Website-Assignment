document.addEventListener('DOMContentLoaded', () => {
    console.log('Enhancements2.js loaded successfully.');

    // Add event listener to the custom alert button
    const customAlertButton = document.getElementById('customAlertButton');
    if (customAlertButton) {
        customAlertButton.addEventListener('click', () => {
            console.log('Custom Alert Button Clicked');
            $.confirm({
                title: '<strong>Action Required</strong>',
                content: `
                    <p style="font-size: 16px; color: #333;">
                        Please ensure all required fields are filled out correctly before proceeding.
                    </p>
                    <ul style="text-align: left; margin-top: 10px; color: #555;">
                        <li>Check that your personal details are complete.</li>
                        <li>Ensure at least one product is added to the cart.</li>
                        <li>Review your comments or special instructions.</li>
                    </ul>
                `,
                type: 'blue',
                boxWidth: '40%',
                useBootstrap: false,
                buttons: {
                    confirm: {
                        text: 'OK',
                        btnClass: 'btn-blue',
                        action: function () {
                            console.log('User acknowledged the alert.');
                        }
                    }
                }
            });
        });
    } else {
        console.error('Custom Alert Button not found.');
    }
});