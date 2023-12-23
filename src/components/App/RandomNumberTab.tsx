import type React from 'react';
import { useStorage } from '@plasmohq/storage/dist/hook';
import ValueForm from '~components/UI/ValueForm';
import ValueList from '~components/UI/ValueList';
import { RANDOM_NUMBER_RESULTS_STORAGE_KEY } from '~constants';
import { isInt, toIntOrThrow, type ValidationRule } from '~utils';

const RandomNumberTab: React.FC = () => {
  const [values, setValues] = useStorage<number[]>(RANDOM_NUMBER_RESULTS_STORAGE_KEY, (v) => (v ?? []));
  const rules: ValidationRule[] = [
    { condition: (v: string) => v.length === 0, errorMessage: 'The field is required.' },
    { condition: (v: string) => !isInt(v), errorMessage: 'The must be an integer.' },
    { condition: (v: string) => values.includes(toIntOrThrow(v)), errorMessage: 'Has a duplicate value.' },
  ];

  const handleSubmitted = async (value: string) => setValues([...values, toIntOrThrow(value)]);
  const handleClear = async () => setValues([]);
  const handleDelete = async (value: string) => setValues(values.filter((v) => v !== toIntOrThrow(value)));

  return (
    <>
      <ValueForm onSubmitted={handleSubmitted} placeholder="Your integer" rules={rules} />
      <ValueList onClear={handleClear} onDelete={handleDelete} values={values} />
    </>
  );
};

export default RandomNumberTab;
