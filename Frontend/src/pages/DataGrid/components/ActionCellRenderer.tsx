
import { ACTIONS } from '../constants/actions';

interface ActionCellRendererProps {
  data: any;
  selectedActions: string[];
}

export const ActionCellRenderer: React.FC<ActionCellRendererProps> = ({ data, selectedActions }) => (
  <div style={{ display: 'flex', gap: '8px' }}>
    {ACTIONS.filter(a => selectedActions.includes(a.value)).map(action => (
      <button style={{marginTop:"4px"}} key={action.value} onClick={() => action.handler(data)}>
        {action.label}
      </button>
    ))}
  </div>
);