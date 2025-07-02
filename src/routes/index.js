import express from 'express';
import userRoutes from './user.route.js';
import positionRoutes from './position.route.js';
import uploadRoutes from './upload.route.js';

const router = express.Router();

router.use('/user', userRoutes);
router.use('/position', positionRoutes);
router.use('/upload', uploadRoutes);

export default router;
