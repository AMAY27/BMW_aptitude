import { useNavigate, } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { Box, Button, DialogActions, Typography, Paper, Divider, IconButton, Dialog, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useState } from 'react';


const CarDetails = () => {
  const navigate = useNavigate();
  const carData = localStorage.getItem("carData");
  const parsedCar = carData ? JSON.parse(carData) : {};
  const [editOpen, setEditOpen] = useState(false);
  const [formData, setFormData] = useState(parsedCar);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEditOpen = () => {
    setFormData(parsedCar);
    setEditOpen(true);
    setError("");
  };
  const handleEditClose = () => setEditOpen(false);
  const handleFormChange = (key: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [key]: value }));
  };
  const handleUpdate = async () => {
    setLoading(true);
    setError("");
    try {
      const updateData = { ...formData };
      delete updateData._id;
      // const resp = await axios.put(`/cars/${parsedCar._id}`, updateData);
      // localStorage.setItem("carData", JSON.stringify(resp.data));
      setEditOpen(false);
      window.location.reload();
    } catch (err: any) {
      setError(err?.response?.data?.error || "Failed to update car.");
    } finally {
      setLoading(false);
    }
  };
  if (!carData) {
    return <Typography variant="h6">No car data available</Typography>;
  }
  return (
    <>
      <Navbar />
      
      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Car Details</DialogTitle>
        <DialogContent>
          {Object.entries(formData)
            .filter(([key]) => key !== "_id")
            .map(([key, value]) => (
              <TextField
                key={key}
                label={key.replace(/_/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2').replace(/\b\w/g, c => c.toUpperCase())}
                value={value}
                onChange={e => handleFormChange(key, e.target.value)}
                margin="normal"
                fullWidth
              />
            ))}
          {error && <Typography color="error">{error}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="secondary">Cancel</Button>
          <Button onClick={handleUpdate} color="primary" variant="contained" disabled={loading}>{loading ? "Updating..." : "Update"}</Button>
        </DialogActions>
      </Dialog>
      <Box sx={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', bgcolor: '#f5f5f5' }}>
        <Paper elevation={3} sx={{ p: 4, minWidth: 350, maxWidth: 500, bgcolor: 'white', borderRadius: 2 }}>
          <Typography variant="h4" gutterBottom align="center">Car Details</Typography>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{display:"flex", justifyContent: "end"}}><Button color="primary" onClick={handleEditOpen} variant="contained">Edit</Button></Box>
          <Box sx={{ maxHeight: 400, overflowY: 'auto', m: 2 }}>
            {Object.entries(parsedCar)
              .filter(([key]) => key !== "_id")
              .map(([key, value]) => {
                let formattedKey = key
                  .replace(/_/g, ' ')
                  .replace(/([a-z])([A-Z])/g, '$1 $2')
                  .replace(/\b\w/g, c => c.toUpperCase());
                return (
                  <Box key={key} sx={{ display: 'flex', mb: 1 }}>
                    <Typography variant="subtitle2" sx={{ minWidth: 120, fontWeight: 600, color: 'text.secondary' }}>{formattedKey}:</Typography>
                    <Typography variant="body1" sx={{ ml: 1 }}>{String(value)}</Typography>
                  </Box>
                );
              })}
          </Box>
          <Button variant="contained" color="primary" fullWidth onClick={() => navigate("/")}>Back to Data Grid</Button>
        </Paper>
      </Box>
    </>
  );
}

export default CarDetails