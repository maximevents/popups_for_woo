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
    toast.className = 'toast';

    // Create image element for the icon
    var icon = document.createElement('img');
    icon.src = imageUrl; // Set the image source to the provided URL
    icon.style.marginRight = '10px'; // Adjust spacing between icon and message
    toast.appendChild(icon); // Append the icon to the toast element

    // Create span element for the message
    var messageSpan = document.createElement('span');
    messageSpan.textContent = message; // Set the text content to the provided message
    toast.appendChild(messageSpan); // Append the message to the toast element

    // Append toast to the container or create the container if it doesn't exist
    var toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.style.position = 'fixed';
        toastContainer.style.bottom = '20px';
        toastContainer.style.right = '20px';
        toastContainer.style.zIndex = '9999';
        document.body.appendChild(toastContainer);
    }
    toastContainer.appendChild(toast);

    // Automatically remove toast after a delay
    setTimeout(function() {
        toast.remove();
    }, 3000); // Adjust delay as needed
}


        // Make a request to your Cloud Function endpoint to fetch toast messages
        $.ajax({
            url: 'https://asia-southeast1-aask-5ad82.cloudfunctions.net/popupsForWoo',
            method: 'GET',
            success: function(data) {
                // Display received messages as toasts
                data.forEach(message => {
                    showToast(message);
                });
            },
            error: function(error) {
                console.error('Error fetching toast messages:', error);
            }
        });
    });
};
document.head.appendChild(script);
