function getIntegers() {
    let integers = localStorage.getItem('integers');

    return integers !== null ? integers.split(',') : [1, 2, 3];
}

function setIntegers(integers) {
    localStorage.setItem('integers', integers.join());
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    switch (message.action) {
        case 'getIntegers':
            let data = getIntegers();

            sendResponse({data: data});
            break;
        case 'setIntegers':
            setIntegers(message.data);
            break;
    }
});
