export const isInt = (value: string): boolean => /^-?(0|([1-9][0-9]*))$/.test(value);

export const toIntOrThrow = (value: string): number => {
  if (!isInt(value)) {
    throw new Error(`Invalid integer value: ${value}`);
  }

  const parsed = parseInt(value, 10);
  if (Number.isNaN(parsed)) {
    throw new Error(`Parsing error value: ${value}`);
  }

  return parsed;
};

export const delay = (ms: number): Promise<void> => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

export const querySelectorOrThrow = <T extends Element>(selector: string): T => {
  const element = document.querySelector<T>(selector);
  if (!element) {
    throw new Error(`Element not found: ${selector}`);
  }

  return element;
};

export const randomInteger = (min: number, max: number = min): number => {
  if (typeof min !== 'number' || typeof max !== 'number') {
    throw new TypeError('Expected all arguments to be numbers');
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const arrayShuffle = <T>(array: T[]): T[] => {
  if (!Array.isArray(array)) {
    throw new TypeError(`Expected an array, got ${typeof array}`);
  }

  const shuffledArray = [...array];
  for (let index = shuffledArray.length - 1; index > 0; index -= 1) {
    const newIndex = Math.floor(Math.random() * (index + 1));
    [shuffledArray[index], shuffledArray[newIndex]] = [shuffledArray[newIndex], shuffledArray[index]];
  }

  return shuffledArray;
};

export const getRandomNumberInRange = (values: number[], min: number, max: number): number => {
  const filteredItems = values.filter((item) => item >= min && item <= max);
  if (!filteredItems.length) {
    throw new Error('No values found within the specified range.');
  }
  return filteredItems[randomInteger(0, filteredItems.length - 1)];
};

export const getNumericInputValueOrThrow = (selector: string): number => {
  try {
    return toIntOrThrow(querySelectorOrThrow<HTMLInputElement>(selector).value);
  } catch {
    throw new Error(`Invalid numeric value in element: ${selector}`);
  }
};

export const getUtcDateTimeString = (date: Date): string => {
  const pad = (num: number): string => num.toString().padStart(2, '0');

  const year = date.getUTCFullYear();
  const month = pad(date.getUTCMonth() + 1);
  const day = pad(date.getUTCDate());
  const hour = pad(date.getUTCHours());
  const minute = pad(date.getUTCMinutes());
  const second = pad(date.getUTCSeconds());

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};

export interface ValidationRule {
  condition: (value: any) => boolean;
  errorMessage: string;
}

export const validate = (rules: ValidationRule[], value: any): string | null => {
  const failedRule = rules.find((rule) => rule.condition(value));
  return failedRule?.errorMessage ?? null;
};
