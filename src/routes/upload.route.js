import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

// Suporte ao __dirname no ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminho absoluto da pasta uploads (fora da src agora)
const uploadsPath = path.join(__dirname, '../../uploads');

// Configuração do Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsPath); // pasta onde salva os arquivos
    },
    filename: function (req, file, cb) {
        // Substitui espaços por underline e remove caracteres especiais
        const safeOriginalName = file.originalname
            .replace(/\s+/g, '_')             // troca espaços por "_"
            .replace(/[^\w.-]/g, '');         // remove caracteres não seguros

        const uniqueName = `${Date.now()}-${safeOriginalName}`;
        cb(null, uniqueName);
    },
});

const upload = multer({ storage });

// Rota POST /upload
router.post('/', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'Nenhum arquivo enviado.' });
    }

    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    res.status(200).json({ url: fileUrl });
});

export default router;
