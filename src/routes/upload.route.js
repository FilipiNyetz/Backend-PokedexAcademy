import express from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.config.js'; // ← aqui está o ajuste

const router = express.Router();

// Configurar o storage com Cloudinary
const storage = new CloudinaryStorage({
    cloudinary, // ← usando a instância configurada
    params: {
        folder: 'uploads', // Nome da pasta no Cloudinary
        allowed_formats: ['jpg', 'png', 'jpeg'],
    },
});

const upload = multer({ storage });

// Rota de upload
router.post('/', upload.single('file'), (req, res) => {
    try {
        if (!req.file || !req.file.path) {
            return res.status(400).json({ error: 'Falha ao enviar o arquivo.' });
        }
        return res.status(200).json({ url: req.file.path });
    } catch (err) {
        console.error('Erro no upload:', JSON.stringify(err, Object.getOwnPropertyNames(err), 2));
        res.status(500).json({ error: 'Erro interno no servidor.' });
    }
});


export default router;
