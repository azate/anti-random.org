import type { PlasmoCSConfig } from 'plasmo';
import { Storage as InternalStorage } from '@plasmohq/storage';
import { LIST_RANDOMIZER_RESULTS_STORAGE_KEY } from '~constants';
import { arrayShuffle, querySelectorOrThrow } from '~utils';

export const config: PlasmoCSConfig = {
  matches: ['https://*.random.org/lists/*'],
  run_at: 'document_start',
};

const FALSIFICATION_STATE_SESSION_KEY = 'falsification-state';

const enableFalsify = () => sessionStorage.setItem(FALSIFICATION_STATE_SESSION_KEY, '');
const disableFalsify = () => sessionStorage.removeItem(FALSIFICATION_STATE_SESSION_KEY);
const isEnabledFalsify = (): boolean => sessionStorage.getItem(FALSIFICATION_STATE_SESSION_KEY) !== null;

const handleFalsifyResult = (storage: InternalStorage): void => {
  new MutationObserver(async (mutations: MutationRecord[], observer: MutationObserver) => {
    if (!isEnabledFalsify()) {
      return;
    }

    const values: string[] = arrayShuffle(await storage.get(LIST_RANDOMIZER_RESULTS_STORAGE_KEY) ?? []);
    if (!values.length) {
      return;
    }

    const mutation = mutations.find((x) => x.target instanceof HTMLOListElement);
    if (!mutation || !(mutation.target instanceof HTMLOListElement)) {
      return;
    }

    const elements: HTMLElement[] = Array.from(mutation.target.children) as HTMLElement[];
    if (!elements.length) {
      return;
    }

    observer.disconnect();

    elements.reduce((originalValues: string[], element: HTMLElement, index: number) => {
      const originalValue = element.innerText;
      if (values[index] !== undefined) {
        element.innerText = values[index];
        return [...originalValues, originalValue];
      }

      if (originalValues.length && values.includes(originalValue)) {
        const newValueIndex = originalValues.findIndex((x) => !values.includes(x));
        if (newValueIndex === -1) {
          return originalValues;
        }
        element.innerText = originalValues[newValueIndex];
        return originalValues.splice(newValueIndex, 1);
      }

      return originalValues;
    }, []);

    disableFalsify();
    await storage.set(LIST_RANDOMIZER_RESULTS_STORAGE_KEY, []);
  }).observe(document, {
    childList: true,
    subtree: true,
    attributes: false,
    characterData: false,
  });
};

const handlerRandomizeClick = (): void => {
  try {
    const element = querySelectorOrThrow<HTMLInputElement>('input[value="Randomize"]');
    element.addEventListener('click', () => disableFalsify());
    element.addEventListener('contextmenu', (event: Event) => {
      event.preventDefault();
      enableFalsify();
      (element.parentElement?.parentElement as HTMLFormElement | undefined | null)?.submit();
    });
  } catch (error: any) {
    console.log(error);
  }
};

const handlerAgainClick = (): void => {
  try {
    const element = querySelectorOrThrow<HTMLInputElement>('input[value="Again!"]');
    element.addEventListener('click', () => disableFalsify());
    element.addEventListener('contextmenu', (event: Event) => {
      event.preventDefault();
      enableFalsify();
      (element.parentElement as HTMLFormElement | undefined | null)?.submit();
    });
  } catch (error: any) {
    console.log(error);
  }
};

(async () => {
  const storage = new InternalStorage();
  handleFalsifyResult(storage);
  document.addEventListener('DOMContentLoaded', () => {
    handlerRandomizeClick();
    handlerAgainClick();
  });
})();
