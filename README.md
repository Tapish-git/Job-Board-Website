# Job Board Backend

## Overview
This is the backend for the Job Board application. It is built with simple REST API with Node.js, Express, and TypeScript. The backend handles CRUD operations for job listings.

## Requirements
- Node.js
- npm

## Setup Instructions

1. Clone the repository:
    ```bash
    git clone https://github.com/Tapish-git/job-board.git
    cd job-board/backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Run the backend server:
    ```bash
    npm start
    ```

4. The backend server will start on `http://localhost:5000`.

## API Endpoints

### 1. Add a New Job
- **POST** `/jobs`
- Request body:
    ```json
    {
      "title": "Software Engineer",
      "company": "Google",
      "description": "Develop web applications.",
      "status": "open"
    }
    ```

### 2. Fetch All Jobs
- **GET** `/jobs`

### 3. Fetch a Job by ID
- **GET** `/jobs/:id`

### 4. Update a Job's Status
- **PATCH** `/jobs/:id`
- Request body:
    ```json
    {
      "status": "closed"
    }
    ```

### 5. Delete a Job
- **DELETE** `/jobs/:id`

--- *** ---

# Job Board Frontend

## Overview
This is the frontend for the Job Board application. It is built using React, TypeScript, and Material UI. The frontend communicates with the backend API to display and manage job listings.

## Requirements
- Node.js
- npm

## Setup Instructions

1. Clone the repository:
    ```bash
    git clone https://github.com/Tapish-git/job-board.git
    cd job-board/frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Run the frontend server:
    ```bash
    npm start
    ```

4. The frontend will start on `http://localhost:3000`.

## Features

- **Job Listing**: Displays all job listings fetched from the backend API.
- **Add Job**: A form to create new job listings.
- **Update Job Status**: Toggle job status between `open` and `closed`.
- **Delete Job**: Remove a job from the listings.
- **View Job Details**: Click on the job title to view more detailed information.

---

## Notes:
- The frontend assumes the backend is running at `http://localhost:5000`. Ensure that both the backend and frontend servers are running simultaneously. Always have to start the backend first.
