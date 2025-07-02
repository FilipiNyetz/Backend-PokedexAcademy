import { createUser, editUser, listAllUsers } from "../service/user.service.js";

export async function getUsers(req, res) {
    try {
        const users = await listAllUsers()
        res.status(200).json(users)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro no servidor, tente novamente' })
    }
}

export async function postUser(req, res) {
    try {
        const { userName, kit, course, period, birthday, hackaton, avaliableWork, apps, idPosition } = req.body

        const profilePicture = req.file ? req.file.buffer : null;

        if (!userName || !kit || !birthday) {
            return res.status(400).json({ message: 'Parâmetros ausentes' });
        }

        const newUser = await createUser({ userName, kit, course, period, birthday, hackaton, avaliableWork, profilePicture, apps, idPosition })
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function patchUser(req, res) {
    try {
        const { idUser, userName, kit, course, period, birthday, hackaton, avaliableWork, profilePicture, apps, idPosition } = req.body
        if (!kit) {
            return res.status(400).json({ message: 'Parâmetros ausentes' });
        }

        const updateUser = await editUser({ idUser, userName, kit, course, period, birthday, hackaton, avaliableWork, profilePicture, apps, idPosition })
        res.status(201).json(updateUser);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

