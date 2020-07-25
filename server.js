import express from 'express';
import 'babel-polyfill';
import cors from 'cors';
import env from './env';
import adminRoutes from './app/routes/adminRoutes';
import userTypes from './app/routes/userTypesRoutes';

const app = express();

// Add middleware for parsing URL encoded bodies (which are usually sent by browser)
app.use(cors());
// Add middleware for parsing JSON and urlencoded data and populating `req.body`
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/v1', adminRoutes);
app.use('/api/v1', userTypes);

app.listen(env.port).on('listening', () => {
  console.log(`🚀 are live on ${env.port}`);
});

export default app;