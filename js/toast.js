jQuery(document).ready(function($) {
    // Inject CSS into the document
    const css = `
    .toast-message {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #333;
        color: #fff;
        padding: 10px;
        border-radius: 5px;
        z-index: 10000;
        display: none;
    }
    .toast-message.show {
        display: block;
    }`;
    const style = document.createElement('style');
    style.type = 'text/css';
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
    document.head.appendChild(style);

    // Fetch and display toast messages
    $.ajax({
        url: 'https://asia-southeast1-aask-5ad82.cloudfunctions.net/popupsForWoo',
        method: 'GET',
        success: function(data) {
            data.forEach(function(record) {
                showToast(record.fields.message);
            });
        },
        error: function(error) {
            console.error('Error fetching toast messages:', error);
        }
    });

    function showToast(message) {
        const toast = $('<div class="toast-message"></div>').text(message);
        $('body').append(toast);
        toast.fadeIn();
        setTimeout(() => { toast.fadeOut(); }, 3000);
    }
});
