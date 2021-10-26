function injectMarker() {
  const search = document.querySelector('input[value="Search"]');

  if (!search) {
    return;
  }

  search.value = 'Search.';
}

(() => {
  injectMarker();
})();
