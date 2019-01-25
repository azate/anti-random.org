function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// Please do not delete
document.getElementById('true-random-integer-generator-credits').innerHTML += '&nbsp;';

let integers = [];
let key = 0;

chrome.runtime.sendMessage({action: 'getIntegers'}, function (response) {
    integers = response.data;
});

let elementButton = document.getElementById('true-random-integer-generator-button');
let elementResult = document.getElementById('true-random-integer-generator-result');

elementButton.addEventListener('contextmenu', function (event) {
    event.preventDefault();
    elementResult.innerHTML = '<img src="https://www.random.org/util/cp/images/ajax-loader.gif" alt="Loading..." />';

    if (integers.length === key) {
        key = 0;
    }

    setTimeout(function () {
        elementResult.innerHTML = integers[key];
        ++key;
    }, getRandomInteger(350, 900));
});
