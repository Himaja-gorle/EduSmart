import 'dotenv/config';
import app from './app.js';
import connectDB from './config/db.js';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
  } catch (error) {
    console.warn('MongoDB not available. Starting in demo mode:', error.message);
  }

  app.listen(PORT, () => {
    console.log(`EduSmart API running on port ${PORT}`);
  });
};

startServer();
