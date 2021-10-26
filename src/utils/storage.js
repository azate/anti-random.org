import { storage } from '@extend-chrome/storage';

export const STORAGE_RESULT_LIST_RANDOMIZER_VALUES = 'resultListRandomizerValues';
export const STORAGE_RESULT_NUMBER_RANDOM_VALUES = 'resultNumberRandomValues';

export function getValues(key) {
  return storage.local
    .get({ [key]: [] })
    .then((result) => result[key]);
}

export function addValue(key, value) {
  return getValues(key)
    .then((values) => storage.local
      .set({ [key]: [...values, value] })
      .then((result) => result[key]));
}

export function deleteValue(key, value) {
  return getValues(key)
    .then((values) => values.filter((v) => v !== value))
    .then((values) => storage.local
      .set({ [key]: values })
      .then((result) => result[key]));
}

export function clearValues(key) {
  return storage.local
    .set({ [key]: [] })
    .then((result) => result[key]);
}
