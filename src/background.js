chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    switch (message.action) {
        case 'getStorage':
            var integers = localStorage.getItem('integers');

            sendResponse({
                data: (integers != null) ? integers : '1'
            });
            break;
        case 'setStorage':
            localStorage.setItem('integers', message.data);
            break;
    }
});