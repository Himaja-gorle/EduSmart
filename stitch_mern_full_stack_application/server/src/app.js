import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import academicRoutes from './routes/academicRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import announcementRoutes from './routes/announcementRoutes.js';
import assignmentRoutes from './routes/assignmentRoutes.js';
import authRoutes from './routes/authRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import enrollmentRoutes from './routes/enrollmentRoutes.js';
import interventionRoutes from './routes/interventionRoutes.js';
import materialRoutes from './routes/materialRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import quizRoutes from './routes/quizRoutes.js';
import screenRoutes from './routes/screenRoutes.js';
import studyPlanRoutes from './routes/studyPlanRoutes.js';
import supportRoutes from './routes/supportRoutes.js';

const app = express();

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests. Please try again later.' },
});

app.use(helmet());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json({ limit: '1mb' }));
app.use(apiLimiter);
app.use(morgan('dev'));

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', app: 'EduSmart API' });
});

app.use('/api/auth', authRoutes);
app.use('/api', academicRoutes);
app.use('/api', analyticsRoutes);
app.use('/api', announcementRoutes);
app.use('/api', enrollmentRoutes);
app.use('/api', assignmentRoutes);
app.use('/api', quizRoutes);
app.use('/api', supportRoutes);
app.use('/api', materialRoutes);
app.use('/api', notificationRoutes);
app.use('/api', interventionRoutes);
app.use('/api', screenRoutes);
app.use('/api', dashboardRoutes);
app.use('/api', studyPlanRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

export default app;
