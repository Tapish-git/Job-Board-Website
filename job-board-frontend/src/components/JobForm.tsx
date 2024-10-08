import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Box, Typography, Container, Alert } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const API_URL = 'http://localhost:5000';

const theme = createTheme({
    palette: {
        primary:{
            main: '#0033a0',
        },
        secondary: {
            main: '#040404',
        },
    },
    typography: {
        fontFamily: 'Arial, sans-serif',
    },
});

// Component to create and submit a new job posting.
// Contains form fields to input job details like title, company, description, and status.
const JobForm = () => {
    //State variables to store the input values
    const [title, setTitle] = useState('');
    const [company, setCompany] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('open');
    const [error, setError] = useState('');     // Error message to display if fields are incomplete

    // Function to handle form submission
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();     // This prevents the page from reloading on form submission

        //Check if all the fields are filled
        if(!title || !company || !description){
            setError('All fields are required!');
            return;
        }

        //Reset error message
        setError('');

        // Send a POST request to the backend to create a new job listing
        axios.post(`${API_URL}/jobs`, { title, company, description, status }).then(() => {
            setTitle('');
            setCompany('');
            setDescription('');
            setStatus('open');
        }).catch(error => console.error(error));
    };

    return (
        <ThemeProvider theme={theme}>
            {/* Display an error message if fields are incomplete */}
            {error && <Alert severity="error">{error}</Alert>}

            {/* Container to center and control the width of the form */}
            <Container maxWidth='md'>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mx: 3 }}>
                    <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'secondary.main', fontWeight: 'bold' }} >
                        Post a new Job
                    </Typography>
                    <TextField fullWidth label="Job Title" required value={title} onChange={e => setTitle(e.target.value)} sx={{ mb: 2}} />
                    <TextField fullWidth label="Company" required value={company} onChange={e => setCompany(e.target.value)} sx={{ mb: 2 }} />
                    <TextField fullWidth label="Job Description" required multiline rows={4} value={description} onChange={e => setDescription(e.target.value)} sx={{ mb:2 }} />

                    {/* Dropdown to select the status of the job */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <InputLabel style={{ marginRight: 10 }}>Status</InputLabel>
                        <FormControl size="small" sx={{ minWidth: 120 }}>
                            <Select value={status} onChange={e => setStatus(e.target.value)}>
                                <MenuItem value="open">Open</MenuItem>
                                <MenuItem value="closed">Closed</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    {/* Submit button to post the job */}
                    <Button variant="contained" type="submit" sx={{ mt: 2, backgroundColor: 'secondary.main', color: 'white', '&:hover': { backgroundColor: 'primary.dark' }, }}>
                        Post Job
                    </Button>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default JobForm;
