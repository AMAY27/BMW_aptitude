import './App.css'
import DataGrid from './pages/DataGrid/DataGrid'
import CarDetails from './pages/CarDetails/CarDetails';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App" style={{ width: "100%", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <Router>
        <Routes>
          <Route path="/" element={<DataGrid />} />
          <Route path="/car/:id" element={<CarDetails />} />
          {/* Add more routes here as needed */}
        </Routes>
      </Router>
    </div>
  )
}

export default App
