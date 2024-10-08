import React from 'react';
import logo from './logo.svg';
import './App.css';
import JobForm from './components/JobForm';
import JobList from './components/JobList';
import { CssBaseline, Box, AppBar, Toolbar, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0033a0',
    },
    secondary: {
      main: '#f7f7fa',
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
});

// Main application component that sets up the layout and displays both the JobForm and JobList
// The entire app is wrapped with a MUI ThemeProvider
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline helps with consistent layout and resets browser default styles */}
      <CssBaseline />

      {/* Box component acts as a container with flex-grow to make the content responsive */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: 'primary.main' }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Career Opportunities
            </Typography>
          </Toolbar>
        </AppBar>
        <hr style={{ border: '0.2px solid #ccc', margin: '2px 0' }} />
        <JobForm />
        <hr style={{ border: '2px solid #ccc', margin: '20px 0' }} />
        <JobList />
      </Box>
    </ThemeProvider>
  );
}

export default App;
