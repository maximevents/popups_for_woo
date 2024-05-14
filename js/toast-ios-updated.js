// Include jQuery directly within the toast.js file
var script = document.createElement('script');
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js';
script.onload = function() {
    // Once jQuery is loaded, execute the rest of the script
    $(document).ready(function() {
        
        // Function to display toast messages with icons
        function showToast(message, imageUrl) {
            // Create toast element
            var toast = document.createElement('div');
            toast.className = 'toast ios-toast';

            // Create content div for the toast
            var content = document.createElement('div');
            content.className = 'toast-content';
            toast.appendChild(content);

            // Create image element for the icon
            var icon = document.createElement('img');
            icon.src = imageUrl; // Set the image source to the provided URL
            icon.className = 'toast-icon'; // Add class for icon styling
            content.appendChild(icon); // Append the icon to the content element

            // Create span element for the message
            var messageSpan = document.createElement('span');
            messageSpan.textContent = message; // Set the text content to the provided message
            messageSpan.className = 'toast-message'; // Add class for message styling
            content.appendChild(messageSpan); // Append the message to the content element

            // Create close button
            var closeButton = document.createElement('span');
            closeButton.textContent = '×'; // Close icon (you can customize the icon as needed)
            closeButton.className = 'close-button';
            closeButton.addEventListener('click', function() {
                toast.remove(); // Remove the toast when the close button is clicked
            });
            content.appendChild(closeButton); // Append the close button to the content element

            // Append toast to the container or create the container if it doesn't exist
            var toastContainer = document.getElementById('toast-container');
            if (!toastContainer) {
                toastContainer = document.createElement('div');
                toastContainer.id = 'toast-container';
                toastContainer.style.position = 'fixed';
                toastContainer.style.bottom = '20px';
                toastContainer.style.right = '20px';
                toastContainer.style.zIndex = '9999';
                toastContainer.style.display = 'flex';
                toastContainer.style.flexDirection = 'column';
                toastContainer.style.alignItems = 'flex-end';
                document.body.appendChild(toastContainer);
            }
            
            // Add spacing between each toast message
            var existingToasts = toastContainer.getElementsByClassName('toast');
            if (existingToasts.length > 0) {
                toast.style.marginTop = '12px'; // Add top margin for spacing between messages
            }

            toastContainer.appendChild(toast);
        }

        // CSS styles for toast notifications
        var toastStyles = `
            /* Toast container styles */
            #toast-container {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 9999;
                display: flex;
                flex-direction: column;
                align-items: flex-end;
            }

            /* Toast message styles */
            .toast {
                animation: slide-up 0.3s ease-out;
                margin-bottom: 12px;
            }

            /* Toast content styles */
            .toast-content {
                width: 100%;
                display: flex;
                align-items: start;
                justify-content: space-between;
                gap: 0.75rem;
                padding: 12px;
                background-color: rgb(229 231 235 / 0.75);
                backdrop-filter: blur(8px);
                -webkit-backdrop-filter: blur(8px);
                --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
                --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);
                box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
                border-radius: 10px;
                font-size: 1rem;
                line-height: 1.5rem;
                z-index: 50;
                color: rgb(47, 48, 60);
                box-sizing: border-box;
                font-family: "Gabarito", ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
                text-align: left;
            }

            /* Toast icon styles */
            .toast-icon {
                width: 40px;
                height: 40px;
                border-radius: 10px;
            }

            /* Toast message text styles */
            .toast-message {
                flex: 1;
                font-size: 1rem;
                line-height: 1.5rem;
            }

            /* Close button styles */
            .close-button {
                font-size: 20px;
                cursor: pointer;
                color: #888;
            }

            .close-button:hover {
                color: #333;
            }

            /* Slide-up animation for toasts */
            @keyframes slide-up {
                from {
                    transform: translateY(100%);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
        `;

        // Create a <style> element and append CSS styles to it
        var styleElement = document.createElement('style');
        styleElement.textContent = toastStyles;

        // Append the <style> element to the document's <head>
        document.head.appendChild(styleElement);

        // Make a request to your Cloud Function endpoint to fetch toast messages
        $.ajax({
            url: 'https://asia-southeast1-aask-5ad82.cloudfunctions.net/popupsForWoo',
            method: 'GET',
            success: function(data) {
                // Display received messages as toasts
                data.forEach(record => {
                    showToast(record.message, record.imageUrl);
                });
            },
            error: function(error) {
                console.error('Error fetching toast messages:', error);
            }
        });
    });
};
document.head.appendChild(script);
