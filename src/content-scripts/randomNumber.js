import arrayShuffle from 'array-shuffle';
import date from 'date-and-time';
import randomInteger from 'random-int';
import { deleteValue, getValues, STORAGE_RESULT_NUMBER_RANDOM_VALUES } from '@/utils/storage';
import { toInt } from '@/utils/helpers';

function getMinValue() {
  const element = document.querySelector('input[id$="-min"]');

  if (!element) {
    throw new Error('Not found min value.');
  }

  const value = toInt(element.value);

  if (value === null) {
    throw new Error('Error get min value.');
  }

  return value;
}

function getMaxValue() {
  const element = document.querySelector('input[id$="-max"]');

  if (!element) {
    throw new Error('Not found max value.');
  }

  const value = toInt(element.value);

  if (value === null) {
    throw new Error('Error get max value.');
  }

  return value;
}

function getValueFromRange(values, min, max) {
  const items = arrayShuffle(values)
    .filter((item) => item >= min && item <= max);

  if (!items.length) {
    throw new Error('Not found value by min and max.');
  }

  const value = items.pop();

  if (value === undefined) {
    throw new Error('Not found value');
  }

  return value;
}

function getResultElement() {
  const element = document.querySelector('span[id$="-result"]');

  if (!element) {
    throw new Error('Not found result element');
  }

  return element;
}

function renderResult(element, minValue, maxValue, value) {
  // eslint-disable-next-line no-param-reassign
  element.innerHTML = ''
    + '<center>'
    + `<span style="font-size:100%;font-weight:bold;">${value}<br></span>`
    + '<span style="font-size:70%;">'
    + `Min:&nbsp;${minValue}, Max:&nbsp;${maxValue}`
    + '<br>'
    + `${date.format(new Date(), 'YYYY-MM-DD hh:mm:ss UTC', true)}`
    + '</span>'
    + '</center>';
}

function renderLoading(element) {
  // eslint-disable-next-line no-param-reassign
  element.innerHTML = '<img src="/util/cp/images/ajax-loader.gif" alt="Loading..." />';
}

(() => {
  const element = document.querySelector('input[value="Generate"]');

  if (!element) {
    return;
  }

  element.addEventListener('contextmenu', async (event) => {
    event.preventDefault();

    try {
      const minValue = getMinValue();
      const maxValue = getMaxValue();
      const values = await getValues(STORAGE_RESULT_NUMBER_RANDOM_VALUES);
      const value = getValueFromRange(values, minValue, maxValue);
      const timeout = randomInteger(300, 800);
      const resultElement = getResultElement();

      await deleteValue(STORAGE_RESULT_NUMBER_RANDOM_VALUES, value);

      event.target.setAttribute('disabled', null);
      renderLoading(resultElement);
      setTimeout(() => {
        renderResult(resultElement, minValue, maxValue, value);
        event.target.removeAttribute('disabled');
      }, timeout);
    } catch (e) {
      event.target.click();
    }
  });
})();
