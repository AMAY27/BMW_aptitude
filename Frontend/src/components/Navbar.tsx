import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Navbar = () => {
  return (
    <AppBar position="fixed" color="primary" sx={{ width: '100%', top: 0, left: 0, zIndex: 1201 }}>
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: '56px !important', p: 0 }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 700, pl: 2 }}>
          BMW
        </Typography>
        <Typography variant="h6" component="div" sx={{ fontWeight: 400, pr: 2 }}>
          Data Grid
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
