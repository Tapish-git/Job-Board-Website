import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Button, Grid, Container, Box, Chip, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const API_URL = 'http://localhost:5000';

// Theme configuration for the MUI components. 
// Sets primary and secondary colors and the font style.
const theme = createTheme({
    palette: {
        primary: {
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

// The Job interface to define the structure of a job object.
interface Job {
    id: number;
    title: string;
    company: string;
    description: string;
    status: string;
}


// Fetches job listings and renders them as cards.
// Each card displays basic job details and includes buttons to update status or delete the job.
const JobList = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);

    // Fetches job listings from the backend API
    useEffect(() => {
        fetchJobs();
    }, []);

    // Sends a request to the backend to fetch all job listings
    const fetchJobs = () => {
        axios.get(`${API_URL}/jobs`).then(response => setJobs(response.data)).catch(error => console.error(error));
    }

    // Sends a PATCH request to update the job status
    const handleStatusUpdate = (id: number, currentStatus: string) => {
        const newStatus = currentStatus === 'open' ? ' closed' : 'open';
        axios.patch(`${API_URL}/jobs/${id}`, { status: newStatus })
        .then(() => fetchJobs())
        .catch(error => console.error(error));
    };

    // Sends a DELETE request to delete the job 
    const handleDelete = (id: number) => {
        axios.delete(`${API_URL}/jobs/${id}`).then(() => fetchJobs()).catch(error => console.error(error));
    };

    return (
        // Renders the list of job cards
        <ThemeProvider theme={theme}>
            <Container maxWidth="lg">
                <Box sx={{ mt: 4, mb: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'secondary.main', fontWeight: 'bold' }}>
                        Job Opportunities
                    </Typography>
                    <Grid container spacing={3}>
                        {jobs.map((job) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={job.id}>
                                <Card variant="outlined" sx={{ 
                                    borderColor: 'secondary.main',
                                    '&:hover': {
                                        boxShadow: 3,
                                    },
                                }}>
                                    <CardContent>
                                        <Typography variant="h5" component="div" sx={{ color: 'primary.main', fontWeight: 'bold', mb: 1 }}>
                                            {job.title}
                                        </Typography>
                                        <Typography variant="subtitle1" sx={{ color: 'secondary.main', mb: 1 }}>
                                            {job.company}
                                        </Typography>
                                        <Chip 
                                            label={job.status === 'open' ? 'Open' : 'Closed'} 
                                            color={job.status === 'open' ? 'success' : 'error'}
                                            size="small"
                                            sx={{ mb: 2 }}
                                        />
                                        <Typography variant="body2" sx={{ mb: 2 }}>
                                            {job.description.substring(0, 100)}...
                                        </Typography>
                                        <Button 
                                            variant="contained"
                                            onClick={() => setSelectedJob(job)}
                                            sx={{ 
                                                mr: 2,
                                                backgroundColor: 'primary.main',
                                                color: 'white',
                                                '&:hover': {
                                                    backgroundColor: 'primary.dark',
                                                },
                                            }}
                                        >
                                            View Details
                                        </Button>
                                        <Button color="primary" variant="outlined" onClick={() => handleStatusUpdate(job.id, job.status)} sx={{ mr: 2, mb: 0 }}>
                                            {job.status === 'open' ? 'Close job' : 'Reopen Job'}
                                        </Button>
                                        
                                        <Button variant="outlined" color="error" onClick={() => handleDelete(job.id)}>
                                            Delete
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
            {/* Dialog to show job details */}
            <Dialog open={!!selectedJob} onClose={() => setSelectedJob(null)} sx={{ bgcolor: 'grey.30' }}>
                <DialogTitle>{selectedJob?.title}</DialogTitle>
                <DialogContent>
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>Company: {selectedJob?.company}</Typography>
                    {/* <Typography variant="body1" sx={{ mb: 2 }}>Status: {selectedJob?.status}</Typography> */}
                    <Typography variant="body2">{selectedJob?.description}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setSelectedJob(null)}>Close</Button>
                </DialogActions>
            </Dialog>
        </ThemeProvider>
    );
};

export default JobList;