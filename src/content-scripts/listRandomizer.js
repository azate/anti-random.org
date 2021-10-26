import arrayShuffle from 'array-shuffle';
import { clearValues, getValues, STORAGE_RESULT_LIST_RANDOMIZER_VALUES } from '@/utils/storage';

function isFalsify() {
  return sessionStorage.getItem('resultListRandomizerIsFalsify') !== null;
}

function enableFalsify() {
  sessionStorage.setItem('resultListRandomizerIsFalsify', '');

  return sessionStorage.getItem('resultListRandomizerIsFalsify') !== null;
}

function disableFalsify() {
  sessionStorage.removeItem('resultListRandomizerIsFalsify');

  return sessionStorage.getItem('resultListRandomizerIsFalsify') === null;
}

function handlerFalsifyResult() {
  // TODO: разобраться  со скоростью
  new MutationObserver(((mutations) => {
    if (!isFalsify()) {
      return;
    }

    getValues(STORAGE_RESULT_LIST_RANDOMIZER_VALUES)
      .then((values) => arrayShuffle(values))
      .then((values) => {
        if (!values.length) {
          return Promise.reject(new Error('Not found values.'));
        }

        return values;
      })
      .then((values) => {
        mutations
          .filter((mutation) => mutation.target instanceof HTMLOListElement)
          .map((mutation) => [...mutation.target.children])
          .filter((children) => children.length > 0)
          .map((children) => children.slice(0, values.length))
          .filter((children) => !children.every((child) => values.includes(child.textContent)))
          .forEach(async (children) => {
            children.forEach((child, index) => {
              // eslint-disable-next-line no-param-reassign
              child.innerText = values[index];
            });

            disableFalsify();
            await clearValues(STORAGE_RESULT_LIST_RANDOMIZER_VALUES);
          });
      })
      .catch((e) => console.log(e));
  })).observe(document, {
    childList: true,
    subtree: true,
    attributes: false,
    characterData: false,
  });
}

function handlerPageEnterListItems() {
  const element = document.querySelector('input[value="Randomize"]');

  if (!element) {
    return;
  }

  element.addEventListener('click', () => {
    disableFalsify();
  });

  element.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    enableFalsify();
    element.parentElement.parentElement.submit();
  });
}

function handlerPageListItems() {
  const element = document.querySelector('input[value="Again!"]');

  if (!element) {
    return;
  }

  element.addEventListener('click', () => {
    disableFalsify();
  });

  element.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    enableFalsify();
    element.parentElement.submit();
  });
}

(() => {
  handlerFalsifyResult();

  document.addEventListener('DOMContentLoaded', () => {
    handlerPageEnterListItems();
    handlerPageListItems();
  });
})();
