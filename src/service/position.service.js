import prisma from '../prisma/client.js'

export async function createPosition({ namePosition }) {
    try {
        const positionExist = await prisma.position.findFirst({
            where: { namePosition },
        });
        if (positionExist) throw new Error('Cargo já existe')


        const newPosition = await prisma.position.create({
            data: {
                namePosition: namePosition
            }
        });
        return newPosition
    } catch (error) {
        console.error("Erro ao criar cargo", error.message);
        throw error;
    }
}

export async function listPositions() {
    try {
        const positionsExist = await prisma.position.findMany()
        if (!positionsExist) throw new Error("não existe nenhuma position")

        return positionsExist

    } catch (error) {
        console.error("Erro ao buscar position", error.message);
        throw error;
    }

}