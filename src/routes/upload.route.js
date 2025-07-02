import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const router = express.Router();

// Configurar o storage com Cloudinary
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'uploads', // Nome da pasta no Cloudinary
        allowed_formats: ['jpg', 'png', 'jpeg'],
    },
});

const upload = multer({ storage });

// Rota de upload
router.post('/', upload.single('file'), (req, res) => {
    if (!req.file || !req.file.path) {
        return res.status(400).json({ error: 'Falha ao enviar o arquivo.' });
    }

    // URL real da imagem no Cloudinary
    const fileUrl = req.file.path;

    return res.status(200).json({ url: fileUrl });
});

export default router;
