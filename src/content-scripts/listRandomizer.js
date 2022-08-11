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
  new MutationObserver(async (mutations, observer) => {
    if (!isFalsify()) {
      return;
    }

    const falsifiedValues = arrayShuffle(await getValues(STORAGE_RESULT_LIST_RANDOMIZER_VALUES));
    if (!falsifiedValues.length) {
      return;
    }

    const mutation = mutations.find((x) => x.target instanceof HTMLOListElement);
    if (mutation === undefined) {
      return;
    }

    const elements = [...mutation.target.children];
    if (!elements.length) {
      return;
    }

    observer.disconnect();

    elements.reduce((originalValues, element, index) => {
      const originalValue = element.innerText;
      if (falsifiedValues[index] !== undefined) {
        // eslint-disable-next-line no-param-reassign
        element.innerText = falsifiedValues[index];
        return [...originalValues, originalValue];
      }

      if (originalValues.length && falsifiedValues.includes(originalValue)) {
        const newValueIndex = originalValues.findIndex((x) => !falsifiedValues.includes(x));
        if (newValueIndex === -1) {
          return originalValues;
        }
        // eslint-disable-next-line no-param-reassign
        element.innerText = originalValues[newValueIndex];
        return originalValues.splice(newValueIndex, 1);
      }

      return originalValues;
    }, []);

    disableFalsify();
    await clearValues(STORAGE_RESULT_LIST_RANDOMIZER_VALUES);
  }).observe(document, {
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
