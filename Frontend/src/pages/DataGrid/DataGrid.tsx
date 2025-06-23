import { useEffect, useState } from 'react'
import { fetchAllCarsData, fetchCarsBySearchTerm } from './Services/DataService';
import { Box, Button, TextField } from '@mui/material';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef } from "ag-grid-community";
ModuleRegistry.registerModules([ AllCommunityModule ]);
import { AgGridReact } from "ag-grid-react"
import { HeaderComponent } from './components/HeaderComponent';
import { ActionCellRenderer } from './components/ActionCellRenderer';
import { FilterComponent } from './components/FilterComponent';
import Navbar from '../../components/Navbar';


const DataGrid = () => {
  const [allCarsData, setAllCarsData] = useState<any[]>([]);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([]);
  const [selectedActions, setSelectedActions] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [dataFromSearch, setDataFromSearch] = useState<any[]>([]);
  const [isFilterClicked, setIsFilterClicked] = useState<boolean>(false);
  const [dataFromFilter, setDataFromFilter] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllCarsData();
        setAllCarsData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (allCarsData.length > 0) {
      const keys = Object.keys(allCarsData[0]).filter(key => key !== "_id");
      const cols: ColDef[] = keys.map(key => ({ field: key, type: typeof allCarsData[0][key] }));
      cols.push({
        headerName: "Actions",
        headerComponent: () =>
          <HeaderComponent
            selectedActions={selectedActions}
            setSelectedActions={setSelectedActions}
          />,
        field: "actions",
        cellRenderer: (params: any) =>
          <ActionCellRenderer
            {...params}
            selectedActions={selectedActions}
          />,
        pinned: 'left',
        width: 150,
        sortable: false,
        filter: false,
      });
      setColumnDefs(cols);
    }
    console.log("Column Definitions: ", columnDefs);
  }, [allCarsData, selectedActions])

  useEffect(() => {
    console.log("Column Definitions Updated: ", columnDefs);
  }, [columnDefs])

  const handleSearch = async () => {
    try {
      const resp = await fetchCarsBySearchTerm(searchTerm);
      if (resp.status !== 200) {
        alert("No data found for the given search term.");
        setDataFromSearch([]);
        return;
      }
      const data = resp.data;
      setDataFromSearch(data);
    } catch (error) {
      alert("No data found for the given search term.");
      setDataFromSearch([]);
    }
  }

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (e.target.value.trim() === "") {
      setDataFromSearch([]);
    }
  }

  return (
    <>
      <Navbar />
      <Box sx={{ width: "90%", height: "80%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
            position: 'relative',
          }}>
          <Box sx={{ display: 'flex', alignItems: 'center', width: "40%" }}>
            <TextField
              label="Search"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearchInputChange}
              fullWidth
            />
            <Button
              variant="contained"
              sx={{ ml: 2 }}
              onClick={handleSearch}
              disabled={!searchTerm.trim()}
            >
              Submit
            </Button>
          </Box>
          <Box>
            <Button
              variant="outlined"
              sx={{ ml: 2 }}
              onClick={() => setIsFilterClicked(!isFilterClicked)}
              disabled={isFilterClicked}
            >
              Filter
            </Button>
            <FilterComponent columns={columnDefs} isFilterClicked={isFilterClicked} setIsFilterClicked={setIsFilterClicked} setDataFromFilter={setDataFromFilter} setDataFromSearch={setDataFromSearch} />
          </Box>
        </Box>
        <AgGridReact
          rowData={dataFromSearch.length > 0 ? dataFromSearch : dataFromFilter.length > 0 ? dataFromFilter : allCarsData}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
        />
      </Box>
    </>
  )
}

export default DataGrid