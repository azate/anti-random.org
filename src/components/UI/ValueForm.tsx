import type React from 'react';
import { useCallback, useMemo, useRef, useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import { validate, type ValidationRule } from '~utils';

interface ValueFormProps {
  onSubmitted?: (value: any) => void;
  placeholder?: string;
  rules?: ValidationRule[];
}

const ValueForm: React.FC<ValueFormProps> = ({ onSubmitted, placeholder, rules = [] }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const isNotValid = useMemo(() => error !== null, [error]);
  const isDisabledSubmit = useMemo(() => isNotValid || value.length === 0, [isNotValid, value]);

  const handleSubmitted = useCallback((v: any) => onSubmitted && onSubmitted(v), [onSubmitted]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (isDisabledSubmit) {
      return;
    }
    handleSubmitted(value);
    setValue('');
    setError(null);
    inputRef?.current?.focus();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setError(validate(rules, event.target.value));
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        autoFocus
        error={isNotValid}
        fullWidth
        helperText={error || ' '}
        InputProps={{
          endAdornment: (
            <Tooltip arrow placement="left" title="Add">
              <span>
                <IconButton color="secondary" disabled={isDisabledSubmit} type="submit">
                  <AddCircleIcon />
                </IconButton>
              </span>
            </Tooltip>
          ),
        }}
        inputRef={inputRef}
        onChange={handleChange}
        placeholder={placeholder}
        type="text"
        value={value}
        variant="outlined"
      />
    </form>
  );
};

export default ValueForm;
