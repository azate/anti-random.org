import type React from 'react';
import { useStorage } from '@plasmohq/storage/dist/hook';
import ValueForm from '~components/UI/ValueForm';
import ValueList from '~components/UI/ValueList';
import { LIST_RANDOMIZER_RESULTS_STORAGE_KEY } from '~constants';
import type { ValidationRule } from '~utils';

const ListRandomizerTab: React.FC = () => {
  const [values, setValues] = useStorage<string[]>(LIST_RANDOMIZER_RESULTS_STORAGE_KEY, (v) => (v ?? []));
  const rules: ValidationRule[] = [
    { condition: (v: string) => v.length === 0, errorMessage: 'The field is required.' },
    { condition: (v: string) => values.includes(v), errorMessage: 'Has a duplicate value.' },
  ];

  const handleSubmitted = async (value: string) => setValues([...values, value]);
  const handleClear = async () => setValues([]);
  const handleDelete = async (value: string) => setValues(values.filter((v) => v !== value));

  return (
    <>
      <ValueForm onSubmitted={handleSubmitted} placeholder="Your value" rules={rules} />
      <ValueList onClear={handleClear} onDelete={handleDelete} values={values} />
    </>
  );
};

export default ListRandomizerTab;
