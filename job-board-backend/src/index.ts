import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

interface Job {
    id: number;
    title: string;
    company: string;
    description: string;
    status: 'open' | 'closed'; 
}

let jobs: Job[] = [];
let nextId = 1;

//POST : Add a new job listing
app.post('/jobs', (req: Request, res: Response) => {
    const { title, company, description, status } = req.body;
    const newJob: Job = {
        id: nextId++,
        title,
        company,
        description,
        status
    };
    jobs.push(newJob);
    res.status(201).json(newJob);
});

//GET : Fetch all job listings
app.get('/jobs', (req: Request, res: Response) => {
    res.json(jobs);
});

//GET : Fetch details for a specific job
app.get('/jobs/:id', (req: Request, res: Response) => {
    const job = jobs.find(j => j.id === parseInt(req.params.id));
    if (job) {
        res.json(job);
    } else {
        res.status(404).json({ message: 'Job not found' });
    }
});

//PATCH : Update a job listing
app.patch('/jobs/:id', (req: Request, res: Response) => {
    const jobIndex = jobs.findIndex(j => j.id === parseInt(req.params.id));
    if(jobIndex !== -1){
        jobs[jobIndex] = { ...jobs[jobIndex], ...req.body };
        res.json(jobs[jobIndex]);
    } else {
        res.status(404).json({ message: 'Job not found' });
    }
});

//DELETE : Delete a job listing
app.delete('/jobs/:id', (req: Request, res: Response) => {
    const jobIndex = jobs.findIndex(j => j.id === parseInt(req.params.id));
    if(jobIndex !== -1){
        jobs.splice(jobIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Job not found' });
    }
});

app.get('/jobs', (req: Request, res: Response) => {
    res.send('Job Board API')
});

app.listen(PORT, () => {
    console.log(`Server is running on the port ${PORT}`);    
});
