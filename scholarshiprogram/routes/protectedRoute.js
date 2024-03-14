// routes/protectedRoute.js

import express from 'express';
import checkUserRole from '../middleware/checkUserRole';

const router = express.Router();

// Attach the middleware to a protected route
router.get('/protected', checkUserRole('Admin'), (req, res) => {
  // This code will only execute if the user has the 'Admin' role
  res.send('Access granted');
});

export default router;
