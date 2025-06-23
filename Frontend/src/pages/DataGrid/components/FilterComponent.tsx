import type { ColDef } from "ag-grid-community";
import { useEffect, useState } from "react";
import { queryTypesNumber, queryTypesString } from '../constants/actions';
import { fetchCarsByFilter } from '../Services/DataService';
import { Button, MenuItem, Select, TextField, Typography, Paper } from '@mui/material';

interface FilterComponentProps {
    columns: ColDef[];
    isFilterClicked: boolean;
    setIsFilterClicked: React.Dispatch<React.SetStateAction<boolean>>;
    setDataFromFilter: React.Dispatch<React.SetStateAction<any[]>>;
    setDataFromSearch: React.Dispatch<React.SetStateAction<any[]>>; // Optional prop for search functionality
}

export const FilterComponent: React.FC<FilterComponentProps> = ({ columns, isFilterClicked, setIsFilterClicked, setDataFromFilter, setDataFromSearch }) => {
    const [column, setColumn] = useState<ColDef | undefined>(columns && columns.length > 0 ? columns[0] : undefined);
    const [queryType, setQueryType] = useState<string>("isEqual");
    const [value, setValue] = useState<string | number>("");
    const [errorMsg, setErrorMsg] = useState<string>("");

    useEffect(() => {
        if (columns && columns.length > 0) {
            setColumn(columns[0]);
        }
    }, [columns]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (column && value !== "") {
            try {
                const data = await fetchCarsByFilter(column.field as string, queryType, value, column.type as string);
                setDataFromSearch([]);
                setDataFromFilter(data);
                setIsFilterClicked(false);
                setErrorMsg("");
            } catch (error: any) {
                let errorMessage = "An error occurred while fetching filtered data.";
                // Try to extract the main message from error.response.data
                if (error?.response?.data) {
                    if (typeof error.response.data === "string") {
                        errorMessage = error.response.data;
                    } else if (error.response.data.message) {
                        errorMessage = error.response.data.message;
                    } else {
                        errorMessage = JSON.stringify(error.response.data);
                    }
                } else if (error?.message) {
                    errorMessage = error.message;
                }
                setDataFromFilter([]);
                setErrorMsg(errorMessage);
                // alert(`Error fetching filtered data: ${errorMessage}`);
            }
        }
    }

    if (!isFilterClicked) {
        return null;
    }

    return (
        <Paper elevation={4} sx={{
            position: 'absolute',
            top: '35px',
            right: '0px',
            bgcolor: '#fff',
            border: '1px solid #ccc',
            p: 2,
            boxShadow: 3,
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 300
        }}>
            {errorMsg && (
                <Typography color="error" variant="body2" sx={{ mb: 1 }}>{errorMsg}</Typography>
            )}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <Typography variant="subtitle1" fontWeight={600}>Filter by:</Typography>
                <Select
                    id="filter"
                    name="filter"
                    value={column?.field || ''}
                    onChange={e => {
                        const selected = columns.find(col => col.field === e.target.value);
                        setColumn(selected);
                    }}
                    size="small"
                >
                    {columns.map((col, index) => (
                        <MenuItem key={index} value={col.field}>{col.field}</MenuItem>
                    ))}
                </Select>
                {column && column.type === "number" ? (
                    <Select
                        name="queryType"
                        id="queryType"
                        value={queryType}
                        onChange={e => setQueryType(e.target.value)}
                        size="small"
                    >
                        {queryTypesNumber.map((type, index) => (
                            <MenuItem key={index} value={type.value}>{type.label}</MenuItem>
                        ))}
                    </Select>
                ) : column && column.type === "string" ? (
                    <Select
                        name="queryType"
                        id="queryType"
                        value={queryType}
                        onChange={e => setQueryType(e.target.value)}
                        size="small"
                    >
                        {queryTypesString.map((type, index) => (
                            <MenuItem key={index} value={type.value}>{type.label}</MenuItem>
                        ))}
                    </Select>
                ) : null}
                {column && column.type === "number" ? (
                    <TextField
                        type="number"
                        placeholder="Enter value"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        size="small"
                    />
                ) : column && column.type === "string" ? (
                    <TextField
                        type="text"
                        placeholder="Enter value"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        size="small"
                    />
                ) : null}
                <Button type="submit" variant="contained" color="primary">Apply Filter</Button>
                <Button
                    type="button"
                    variant="outlined"
                    color="warning"
                    onClick={() => {
                        setValue("");
                        setQueryType("isEqual");
                        setColumn(columns[0]);
                        setErrorMsg("");
                        setDataFromFilter([]);
                        setDataFromSearch([]);
                    }}
                >
                    Reset Filter
                </Button>
            </form>
            <Button onClick={() => setIsFilterClicked(false)} color="secondary" sx={{ mt: 1 }}>Cancel</Button>
        </Paper>
    )
}