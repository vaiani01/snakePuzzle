import "./App.css";
import logo from "./tahiti-numerique.jpg";

import { Box, Typography } from "@mui/material";
import SnakeTable from "./components/SnakeTableForm";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="logo" />
        <Typography variant="h2">Vietnamese Snake Puzzle</Typography>
      </header>
      <Box
        sx={{
          width: "auto",
          height: 800,
          backgroundColor: "primary.dark",
        }}
      >
        <SnakeTable />
      </Box>
      <footer className="App-footer">
        Copyright © 2022-2023 Nicolas Couroussé | All Rights Reserved
      </footer>
    </div>
  );
}

export default App;
