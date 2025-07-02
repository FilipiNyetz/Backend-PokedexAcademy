import express from 'express';
import multer from 'multer';
import { getUsers, patchUser, postUser } from '../controller/user.controller.js';

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() }); // mantém imagem na memória como buffer

router.get('/listUser', getUsers);
router.post('/createUser', upload.single('profilePicture'), postUser);
router.patch('/editUser', patchUser);

export default router;
