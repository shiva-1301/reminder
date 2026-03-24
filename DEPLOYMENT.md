# Deployment Guide

## Prerequisites
- GitHub account with your code pushed
- Render account (https://render.com)
- Neon PostgreSQL database

## Backend Deployment to Render

### Step 1: Connect GitHub
1. Go to https://render.com and sign in
2. Click **New +** → **Web Service**
3. Select **Connect a Repository** and choose your GitHub repo
4. Authorize Render to access your GitHub

### Step 2: Configure Build Settings
- **Name**: `reminder-backend`
- **Branch**: `main` (or your default branch)
- **Build Command**: `cd backend && mvn clean package -DskipTests`
- **Start Command**: `java -Dserver.port=$PORT -jar backend/target/backend-0.0.1-SNAPSHOT.jar`
- **Environment**: `Java 17`

### Step 3: Add Environment Variables
In Render dashboard, add these from your `.env` file:
```
DB_URL=jdbc:postgresql://...
DB_USERNAME=your_username
DB_PASSWORD=your_password
SERVER_PORT=0
```

### Step 4: Deploy
Click **Create Web Service** and wait for deployment to complete.

**Your backend URL will be**: `https://reminder-backend.onrender.com`

## Frontend Deployment to Vercel

### Step 1: Update Frontend URL
Edit `.env.production` with your Render backend URL:
```
VITE_API_BASE_URL=https://reminder-backend.onrender.com
```

### Step 2: Deploy to Vercel
1. Go to https://vercel.com
2. Click **New Project** → Import your GitHub repository
3. Select the `frontend` directory as root
4. Click **Deploy**

**Your frontend URL will be**: `https://your-project.vercel.app`

## Environment Variables Reference

### Backend (.env)
- `DB_URL`: PostgreSQL connection string
- `DB_USERNAME`: Database user
- `DB_PASSWORD`: Database password
- `SERVER_PORT`: Port (Render sets this automatically)

### Frontend (.env.production)
- `VITE_API_BASE_URL`: Backend API URL

## Testing Deployment

1. Visit your frontend URL
2. Try logging in/registering
3. Check browser console for any errors
4. Verify API calls go to the correct backend

## Troubleshooting

### Backend won't start
- Check logs in Render dashboard
- Verify database credentials are correct
- Ensure DATABASE_URL is set properly

### Frontend can't reach backend
- Verify `.env.production` has correct API URL
- Check CORS settings in backend
- Ensure backend is running and accessible

### Database connection errors
- Verify Neon database is still active
- Check connection string format
- Confirm firewall allows connections
