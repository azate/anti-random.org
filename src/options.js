function handlerSubmit() {
    let value = document.getElementById('integers').value.split(',');

    chrome.runtime.sendMessage({action: 'setIntegers', data: value});
}

function handlerDOMContentLoaded() {
    chrome.runtime.sendMessage({action: 'getIntegers'}, function (response) {
        document.getElementById('integers').value = response.data.join();
    });

    document.getElementById('submit').addEventListener('click', handlerSubmit);
}

document.addEventListener('DOMContentLoaded', handlerDOMContentLoaded);
