import { ACTIONS } from '../constants/actions';
import { useNavigate } from "react-router-dom";
import { Button, Stack } from '@mui/material';

interface ActionCellRendererProps {
  data: any;
  selectedActions: string[];
  onDeleteSuccess?: () => void;
}

export const ActionCellRenderer: React.FC<ActionCellRendererProps> = ({ data, selectedActions, onDeleteSuccess }) => {
  const navigate = useNavigate();
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      {ACTIONS.filter(a => selectedActions.includes(a.value)).map(action => (
        <Button
          key={action.value}
          size="small"
          variant={action.value === 'delete' ? 'outlined' : 'contained'}
          color={action.value === 'delete' ? 'error' : 'primary'}
          onClick={() => action.handler(data, navigate, onDeleteSuccess)}
        >
          {action.label}
        </Button>
      ))}
    </Stack>
  );
};