import { createPosition, listPositions } from "../service/position.service.js";

export async function postPosition(req, res) {
    try {
        const { namePosition } = req.body
        if (!namePosition) {
            return res.status(400).json({ message: 'Parâmetros ausentes' });
        }

        const newPosition = await createPosition({ namePosition })
        res.status(201).json(newPosition);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getPosition(req, res) {
    try {
        const positions = await listPositions()
        res.status(200).json(positions)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro no servidor, tente novamente' })
    }
}