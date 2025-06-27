import express from 'express';
import userRoutes from './user.route.js'
import positionRoutes from './position.route.js'

const router = express.Router();

router.use('/user', userRoutes)
router.use('/position', positionRoutes)

export default router