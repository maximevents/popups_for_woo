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
    toast.style.backgroundColor = '#ffffff'; // Set background color to white
    toast.style.border = '1px solid #dddddd'; // Set light grey border
    toast.style.padding = '10px'; // Add padding to provide spacing between content and border

    // Create image element for the icon
    var icon = document.createElement('img');
    icon.src = imageUrl; // Set the image source to the provided URL
    icon.style.width = '20px'; // Set the width of the image (adjust as needed)
    icon.style.height = '20px'; // Set the height of the image (adjust as needed)
    icon.style.marginRight = '10px'; // Adjust spacing between icon and message
    toast.appendChild(icon); // Append the icon to the toast element

    // Create span element for the message
    var messageSpan = document.createElement('span');
    messageSpan.textContent = message; // Set the text content to the provided message
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
        toastContainer.style.position = 'fixed';
        toastContainer.style.bottom = '20px';
        toastContainer.style.right = '20px';
        toastContainer.style.zIndex = '9999';
        document.body.appendChild(toastContainer);
    }
    
    // Add spacing between each toast message
    var existingToasts = toastContainer.getElementsByClassName('toast');
    if (existingToasts.length > 0) {
        toast.style.marginTop = '12px'; // Add top margin for spacing between messages
    }

    toastContainer.appendChild(toast);
}




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
