import type React from 'react';
import { useCallback, useMemo } from 'react';
import Chip from '@mui/material/Chip';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';

interface ValueListProps {
  onClear?: () => void;
  onDelete?: (value: any) => void;
  values?: any[];
}

const ValueList: React.FC<ValueListProps> = ({ onClear, onDelete, values = [] }) => {
  const isDisabledClear = useMemo(() => !values.length, [values]);

  const handleClear = useCallback(() => onClear && onClear(), [onClear]);
  const handleDelete = useCallback((v: any) => onDelete && onDelete(v), [onDelete]);

  return (
    <Stack alignItems="center" direction="row" flexWrap="wrap" spacing={1} useFlexGap>
      <Tooltip arrow placement="top" title="Clear">
        <span>
          <IconButton color="secondary" disabled={isDisabledClear} onClick={() => handleClear()}>
            <DeleteSweepIcon />
          </IconButton>
        </span>
      </Tooltip>
      {values.map((v: any) => (
        <Chip key={v} label={v} onDelete={() => handleDelete(v)} />
      ))}
    </Stack>
  );
};

export default ValueList;
