import express from 'express';
import { getUsers, patchUser, postUser } from '../controller/user.controller.js';


const router = express.Router();

router.get('/listUser', getUsers);
router.post('/createUser', postUser);
router.patch('/editUser', patchUser)

export default router;