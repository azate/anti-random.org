document.addEventListener('DOMContentLoaded', function () {
    chrome.runtime.sendMessage({
        action: 'getStorage'
    }, function (response) {
        document.getElementById('integers').value = response.data;
    });

    document.getElementById('set').addEventListener('click', function () {
        chrome.runtime.sendMessage({
            action: 'setStorage',
            data: document.getElementById('integers').value
        });
    });
});