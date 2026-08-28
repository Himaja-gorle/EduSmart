# EduSmart MERN App

This project recreates the missing MERN stack structure for the EduSmart student success platform. It includes a working Express + MongoDB backend and a Vite React frontend, while preserving the concept from the original mock UI screens and converting the static pages into reusable React routes.

## Project structure

- `server/`: Express API and MongoDB models
- `client/`: React + Vite frontend
- `package.json`: root scripts for running both services together

## Prerequisites

- Node.js 18+
- npm 9+
- MongoDB instance (local or MongoDB Atlas)

## 1) Install dependencies

```bash
cd "C:\Users\gorle\Downloads\stitch_mern_full_stack_application\stitch_mern_full_stack_application"
npm install --prefix server
npm install --prefix client
```

Or use:

```bash
npm run install:all
```

## 2) Configure environment variables

Copy the example env files and fill in your values:

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

Example values:

```env
# server/.env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/edusmart
JWT_SECRET=your_generated_secret
CLIENT_URL=http://localhost:5173
```

```env
# client/.env
VITE_API_URL=http://localhost:5000/api
```

## 3) Start the app locally

Run the backend and frontend together:

```bash
cd "C:\Users\gorle\Downloads\stitch_mern_full_stack_application\stitch_mern_full_stack_application"
npm run dev
```

This starts:

- backend: http://localhost:5000
- frontend: http://localhost:5173

Demo login accounts:

- student@edusmart.edu / student123
- faculty@edusmart.edu / faculty123
- admin@edusmart.edu / admin123

## 4) Production build

```bash
cd "C:\Users\gorle\Downloads\stitch_mern_full_stack_application\stitch_mern_full_stack_application"
npm run build
```

Then start the Express server:

```bash
npm start
```

## 5) Deploy the backend

### Option A: Render

1. Push this repo to GitHub
2. Create a new Render Web Service
3. Set the root directory to the project root
4. Use the following build command:

```bash
npm install --prefix server
```

Use the start command:

```bash
npm --prefix server run start
```

Add environment variables:

- `PORT=10000` or Render-managed port
- `MONGO_URI` from MongoDB Atlas
- `JWT_SECRET` from a secure generated string
- `CLIENT_URL=https://your-frontend-domain.com`

### Option B: Railway

1. Create a new Railway project
2. Connect the repo
3. Add a Node service
4. Set working directory to `server`
5. Add environment variables for MongoDB and JWT
6. Deploy

### Option C: VPS / Ubuntu

```bash
sudo apt update
sudo apt install -y nodejs npm mongodb-org-server
cd /var/www/edusmart
npm install --prefix server
cp server/.env.example server/.env
npm --prefix server run start
```

## 6) Deploy the frontend

### Vercel

1. Import the repo into Vercel
2. Set the app root to `client/`
3. Add environment variable:
   - `VITE_API_URL=https://your-backend-domain.com/api`
4. Deploy

### Netlify

1. Create a new Netlify site from the repo
2. Set the publish directory to `client/dist`
3. Build command:

```bash
npm install --prefix client && npm --prefix client run build
```

4. Add environment variable:
   - `VITE_API_URL=https://your-backend-domain.com/api`

## 7) MongoDB Atlas setup

1. Create a MongoDB Atlas account
2. Create a free cluster
3. Create a database user
4. Allow access from anywhere or your deployment IPs
5. Copy the connection string into `MONGO_URI`

Example format:

```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/edusmart?retryWrites=true&w=majority
```

## 8) Production checklist

- Add a strong `JWT_SECRET`
- Use `MONGO_URI` from Atlas or secure managed DB
- Enable CORS for your frontend domain
- Set `NODE_ENV=production`
- Add proper SSL / reverse proxy if hosting on a VPS

## Notes

This is a functional app skeleton matching the original EduSmart concept and data flow. It is ready to extend with more course, quiz, intervention, and analytics features.
