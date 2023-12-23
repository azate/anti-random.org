import type { PlasmoCSConfig } from 'plasmo';
import { Storage as InternalStorage } from '@plasmohq/storage';
import {
  MAX_RANDOM_NUMBER_DELAY,
  MIN_RANDOM_NUMBER_DELAY,
  RANDOM_NUMBER_RESULTS_STORAGE_KEY,
} from '~constants';
import {
  delay,
  getNumericInputValueOrThrow,
  getRandomNumberInRange,
  getUtcDateTimeString,
  querySelectorOrThrow,
  randomInteger,
} from '~utils';

export const config: PlasmoCSConfig = {
  matches: ['https://*.random.org/widgets/integers/iframe*'],
  run_at: 'document_start',
  all_frames: true,
};

type GenerateSubmitElement = HTMLInputElement;
type ResultContainerElement = HTMLElement;

const setInputDisabled = (element: GenerateSubmitElement, disable: boolean): void => {
  element.disabled = disable;
  element.parentElement
    ?.parentElement
    ?.querySelectorAll<HTMLInputElement>('input[type="number"]')
    .forEach((input) => {
      input.disabled = disable;
    });
};

const setLoadingState = (element: ResultContainerElement): void => {
  element.innerHTML = '<img src="/util/cp/images/ajax-loader.gif" alt="Loading...">';
};

const setFalsifiedResult = (
  element: ResultContainerElement,
  falsifiedValue: number,
  minValue: number,
  maxValue: number,
  date: Date,
): void => {
  element.innerHTML = `
        <div style="text-align:center;">
            <span style="font-size:100%;font-weight:bold;">${falsifiedValue}<br></span>
            <span style="font-size:70%;">
                Min:&nbsp;${minValue}, Max:&nbsp;${maxValue}<br>
                ${getUtcDateTimeString(date)} UTC
            </span>
        </div>`;
};

// eslint-disable-next-line arrow-body-style
const handleGenerateClick = (storage: InternalStorage): (event: Event) => Promise<void> => {
  return async (event: Event): Promise<void> => {
    const targetElement = <GenerateSubmitElement>event.target;
    try {
      const values: number[] = await storage.get(RANDOM_NUMBER_RESULTS_STORAGE_KEY) ?? [];
      if (!values.length) {
        targetElement.click();
        return;
      }

      const resultElement = querySelectorOrThrow<ResultContainerElement>('span[id$="-result"]');
      const minValue = getNumericInputValueOrThrow('input[id$="-min"]');
      const maxValue = getNumericInputValueOrThrow('input[id$="-max"]');

      const value = getRandomNumberInRange(values, minValue, maxValue);
      const handleValueRemoval = storage.set(RANDOM_NUMBER_RESULTS_STORAGE_KEY, values.filter((v) => v !== value));

      setInputDisabled(targetElement, true);
      setLoadingState(resultElement);
      await delay(randomInteger(MIN_RANDOM_NUMBER_DELAY, MAX_RANDOM_NUMBER_DELAY));
      setFalsifiedResult(resultElement, value, minValue, maxValue, new Date());
      setInputDisabled(targetElement, false);

      await handleValueRemoval;
    } catch (error: any) {
      console.log(error);
      setInputDisabled(targetElement, false);
      targetElement.click();
    }
  };
};

window.addEventListener('DOMContentLoaded', async () => {
  try {
    const storage = new InternalStorage();
    const element = querySelectorOrThrow<GenerateSubmitElement>('input[value="Generate"]');
    element.addEventListener('contextmenu', handleGenerateClick(storage));
  } catch (error: any) {
    console.log(error);
  }
});
