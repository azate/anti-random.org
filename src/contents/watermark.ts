import type { PlasmoCSConfig } from 'plasmo';
import { querySelectorOrThrow } from '~utils';

export const config: PlasmoCSConfig = {
  matches: ['https://*.random.org/*'],
  run_at: 'document_start',
};

window.addEventListener('DOMContentLoaded', () => {
  try {
    const element = querySelectorOrThrow<HTMLInputElement>('input[value="Search"]');
    element.value = 'Search.';
  } catch (error: any) {
    console.log(error);
  }
});
