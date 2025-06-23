import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { Box, Button, Typography, Paper, Divider } from '@mui/material';

const CarDetails = () => {
  const navigate = useNavigate();
  const carData = localStorage.getItem("carData");
  if (!carData) {
    return <Typography variant="h6">No car data available</Typography>;
  }
  const parsedCar = JSON.parse(carData);
  return (
    <>
      <Navbar />
      <Box sx={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', bgcolor: '#f5f5f5' }}>
        <Paper elevation={3} sx={{ p: 4, minWidth: 350, maxWidth: 500, bgcolor: 'white', borderRadius: 2 }}>
          <Typography variant="h4" gutterBottom align="center">Car Details</Typography>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ maxHeight: 400, overflowY: 'auto', mb: 2 }}>
            {Object.entries(parsedCar).map(([key, value]) => (
              <Box key={key} sx={{ display: 'flex', mb: 1 }}>
                <Typography variant="subtitle2" sx={{ minWidth: 120, fontWeight: 600, color: 'text.secondary' }}>{key}:</Typography>
                <Typography variant="body1" sx={{ ml: 1 }}>{String(value)}</Typography>
              </Box>
            ))}
          </Box>
          <Button variant="contained" color="primary" fullWidth onClick={() => navigate("/")}>Back to Data Grid</Button>
        </Paper>
      </Box>
    </>
  );
}

export default CarDetails