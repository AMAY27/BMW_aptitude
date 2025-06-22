import {ACTIONS} from '../constants/actions'

interface HeaderComponentProps {
  selectedActions: typeof ACTIONS[number]['value'][];
  setSelectedActions : React.Dispatch<React.SetStateAction<string[]>>;
}


export const HeaderComponent:React.FC<HeaderComponentProps> = ({selectedActions, setSelectedActions}) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px' }}>
      <span style={{ fontWeight: 'bold' }}>Actions</span>
      <div>
        {ACTIONS.map(action => (
            <label key={action.value} style={{ marginRight: 8 }}>
                <input
                  type="checkbox"
                  checked={selectedActions.includes(action.value)}
                  onChange={e => {
                    setSelectedActions((prev: string[]) =>
                      e.target.checked
                        ? [...prev, action.value]
                        : prev.filter(a => a !== action.value)
                    );
                  }}
                />
                {action.label}
            </label>
        ))}
      </div>
    </div>
  );
}