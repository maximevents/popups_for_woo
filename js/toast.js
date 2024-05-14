// Include jQuery directly within the toast.js file
var script = document.createElement('script');
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js';
script.onload = function() {
    // Once jQuery is loaded, execute the rest of the script
    $(document).ready(function() {
        // Function to display toast messages
        function showToast(message) {
            // Create toast element
            var toast = document.createElement('div');
            toast.className = 'toast';
            toast.textContent = message;

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
