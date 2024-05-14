// Function to display toast messages with icons
function showToast(message, imageUrl) {
    // Create toast element
    var toast = document.createElement('div');
    toast.className = 'toast ios-toast';

    // Create image element for the icon
    var icon = document.createElement('img');
    icon.src = imageUrl; // Set the image source to the provided URL
    icon.className = 'toast-icon'; // Add class for icon styling
    toast.appendChild(icon); // Append the icon to the toast element

    // Create span element for the message
    var messageSpan = document.createElement('span');
    messageSpan.textContent = message; // Set the text content to the provided message
    messageSpan.className = 'toast-message'; // Add class for message styling
    toast.appendChild(messageSpan); // Append the message to the toast element

    // Create close button
    var closeButton = document.createElement('span');
    closeButton.textContent = '×'; // Close icon (you can customize the icon as needed)
    closeButton.className = 'close-button';
    closeButton.addEventListener('click', function() {
        toast.remove(); // Remove the toast when the close button is clicked
    });
    toast.appendChild(closeButton); // Append the close button to the toast element

    // Append toast to the container or create the container if it doesn't exist
    var toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
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
        background-color: #ffffff;
        border: 1px solid #dddddd;
        padding: 10px 20px;
        border-radius: 15px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        width: 300px;
        max-width: 80%;
        margin-bottom: 12px;
        animation: slide-in 0.3s ease-out;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        color: #333;
    }

    /* Toast icon styles */
    .toast-icon {
        width: 40px;
        height: 40px;
        margin-right: 15px;
        border-radius: 10px;
    }

    /* Toast message text styles */
    .toast-message {
        flex: 1;
        font-size: 16px;
        line-height: 1.5;
    }

    /* Close button styles */
    .close-button {
        font-size: 20px;
        cursor: pointer;
        margin-left: 15px;
        color: #888;
    }

    .close-button:hover {
        color: #333;
    }

    /* Slide-in animation for toasts */
    @keyframes slide-in {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
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
