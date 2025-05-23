
# IPLShort Project

Welcome to the **IPLShort** project! This full-stack application provides IPL match data, including upcoming matches, past match results, the points table, and individual match scorecards. The project includes both the frontend and backend in a single repository.

## Technologies Used

### Use Node 20:

### Frontend:
- **Next.js** (for React-based server-side rendering)
- **Tailwind CSS** (for utility-first CSS styling)

### Backend:
- **Node.js 20** (for server-side logic)
- **Puppeteer** (for web scraping live IPL match data)

## Features

### 1. Upcoming Matches
![Upcoming Matches](screenshots/upcoming_matches.png)
Displays a list of upcoming IPL matches on the homepage.

### 2. Past Match Results
![Past Match Results](screenshots/results.png)
Allows users to view the results of past IPL matches.

### 3. Points Table
![Points Table](screenshots/point_table.png)
Shows the current IPL points table.

### 4. Match Scorecard
![Match Scorecard](screenshots/match_details.png)
Provides detailed scorecards for specific IPL matches.

## Installation and Setup
1. Navigate to the root directory of the project.

### Backend Setup:

1. Navigate to the `backend` directory:

   ```bash
   cd backend
   ```
2. Install backend dependencies:

   ```bash
   npm install
   ```

3. Start the backend server:

   ```bash
   npm start
   ```

   The backend server will run on **http://localhost:3003**.

### Frontend Setup:

1. Navigate to the `frontend` directory:

   ```bash
   cd frontend
   ```

2. Install frontend dependencies:

   ```bash
   npm install
   ```

3. Start the frontend development server:

   ```bash
   npm run dev
   ```

   The frontend will be available at **http://localhost:3000**.

## How It Works

- **Scraping**: Puppeteer is used to scrape live IPL match data, including scores, player stats, and match results.
- **Backend**: The backend handles business logic and serves the scraped data to the frontend.
- **Frontend**: The frontend displays the data, providing users with an interactive and responsive interface built using Tailwind CSS.

