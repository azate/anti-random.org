(function () {
    var integers;

    chrome.runtime.sendMessage({
        action: 'getStorage'
    }, function (response) {
        integers = response.data.split(',');
    });

    var key = 0;

    document.getElementById('true-random-integer-generator-button').addEventListener('contextmenu', function (event) {
        event.preventDefault();

        document.getElementById('true-random-integer-generator-result').innerHTML = '<img src="/util/cp/images/ajax-loader.gif" alt="Loading..." />';

        setTimeout(function () {
            document.getElementById('true-random-integer-generator-result').innerHTML = integers[key];

            if (integers.length == ++key) {
                key = 0;
            }
        }, 1000);
    });
})();