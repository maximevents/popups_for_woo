// Include jQuery directly within the toast.js file
var script = document.createElement('script');
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js';
script.onload = function() {
    // Once jQuery is loaded, execute the rest of the script
    $(document).ready(function() {
        // Your code that depends on jQuery can go here
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

        // Function to display toast messages
        function showToast(message) {
            // Create toast element
            var toast = document.createElement('div');
            toast.className = 'toast';
            toast.textContent = message;

            // Add toast to the container
            document.getElementById('toast-container').appendChild(toast);

            // Automatically remove toast after a delay
            setTimeout(function() {
                toast.remove();
            }, 3000); // Adjust delay as needed
        }

        // CSS styles for toast notifications
        var toastStyles = `
            /* Toast container styles */
            #toast-container {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 9999;
            }
           
            /* Toast message styles */
            .toast {
                background-color: #333;
                color: #fff;
                padding: 10px 20px;
                border-radius: 5px;
                margin-bottom: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
            }
        `;

        // Create a <style> element and append CSS styles to it
        var styleElement = document.createElement('style');
        styleElement.textContent = toastStyles;

        // Append the <style> element to the document's <head>
        document.head.appendChild(styleElement);
    });
};
document.head.appendChild(script);
