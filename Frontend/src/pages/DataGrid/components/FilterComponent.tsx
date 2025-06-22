import type { ColDef } from "ag-grid-community";
import { useEffect, useState } from "react";
import {queryTypesNumber, queryTypesString} from '../constants/actions';
import { fetchCarsByFilter } from '../Services/DataService';

interface FilterComponentProps {
    columns: ColDef[];
    isFilterClicked: boolean;
    setIsFilterClicked: React.Dispatch<React.SetStateAction<boolean>>;
    setDataFromFilter: React.Dispatch<React.SetStateAction<any[]>>;
}

export const FilterComponent: React.FC<FilterComponentProps> = ({columns, isFilterClicked, setIsFilterClicked, setDataFromFilter}) => {


    const [column, setColumn] = useState<ColDef | undefined>(columns && columns.length > 0 ? columns[0] : undefined);
    const [queryType, setQueryType] = useState<string>("isEqual");
    const [value, setValue] = useState<string | number>("");


    useEffect(() => {
    if (columns && columns.length > 0) {
        setColumn(columns[0]);
    }
    }, [columns]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (column && value) {
            fetchCarsByFilter(column.field as string, queryType, value, column.type as string)
                .then(data => {
                    console.log("Filtered Data: ", data);
                    setDataFromFilter(data);
                    setIsFilterClicked(false); 
                })
                .catch(error => {
                    alert(error)
                    setDataFromFilter([]);
                    setIsFilterClicked(false);
                    console.error("Error fetching filtered data: ", error);
                });
        }
    }


    if (!isFilterClicked) {
        return null;
    }

    return(
        <div
            style={{
                position: 'absolute',
                top: '35px',
                right: '0px',
                backgroundColor: '#fff',
                border: '1px solid #ccc',
                padding: '10px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <form action="" onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                <label htmlFor="filter">Filter by:</label>
                <select
                    id="filter"
                    name="filter"
                    value={column?.field}
                    onChange={e => {
                        const selected = columns.find(col => col.field === e.target.value);
                        setColumn(selected);
                    }}
                >
                    {columns.map((col, index) => (
                        <option key={index} value={col.field}>{col.field}</option>
                    ))}
                </select>
                {
                    column && column.type === "number" ? (
                        <select 
                            name="queryType" 
                            id="queryType"
                            value={queryType}
                            onChange={e => setQueryType(e.target.value)}
                        >
                            {queryTypesNumber.map((type, index) => (
                                <option key={index} value={type.value}>{type.label}</option>
                            ))}
                        </select>
                    ) : column && column.type === "string" ? (
                        <select 
                            name="queryType" 
                            id="queryType"
                            value={queryType}
                            onChange={e => setQueryType(e.target.value)}
                        >
                            {queryTypesString.map((type, index) => (
                                <option key={index} value={type.value}>{type.label}</option>
                            ))}
                        </select>
                    ) : null
                }
                {
                    column && column.type === "number" ? <input type="number" placeholder="Enter value" value={value} onChange={(e) => setValue(e.target.value)} />
                    : column && column.type === "string" ? <input type="text" placeholder="Enter value" value={value} onChange={(e) => setValue(e.target.value)} />
                    : null
                }
                <button type="submit">Apply Filter</button>
            </form>
            <button onClick={() => setIsFilterClicked(false)}>Cancel</button>
        </div>
    )

}