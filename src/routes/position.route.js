import express from 'express';
import { getPosition, postPosition } from '../controller/position.controller.js';

const router = express.Router();

router.get('/listPosition', getPosition)
router.post('/createPosition', postPosition)

export default router;