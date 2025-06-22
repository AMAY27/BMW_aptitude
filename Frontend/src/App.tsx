import './App.css'
import DataGrid from './pages/DataGrid/DataGrid'
     

function App() {

  return (
    <div className="App" style={{ width: "100%", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <DataGrid />
    </div>
  )
}

export default App
