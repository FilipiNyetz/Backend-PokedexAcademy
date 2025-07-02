import prisma from '../prisma/client.js'

export async function listAllUsers() {
  try {
    const usersExist = await prisma.user.findMany({
      include: {
        position: true
      },
      orderBy: {
        kit: 'asc'
      }
    });

    if (!usersExist) {
      throw new Error("Não existe nenhum usuário");
    }

    // ✅ Formata os birthdays para o formato ISO 8601 sem milissegundos
    const usersFormatted = usersExist.map(user => ({
      ...user,
      birthday: user.birthday
        ? user.birthday.toISOString().split(".")[0] + "Z"
        : null
    }));

    return usersFormatted;

  } catch (error) {
    console.error("Erro ao buscar usuários", error.message);
    throw error;
  }
}

export async function createUser({
  userName,
  kit,
  course,
  period,
  birthday,
  hackaton,
  avaliableWork,
  profilePicture,
  apps,
  idPosition,
}) {
  try {
    const userExist = await prisma.user.findUnique({
      where: { kit },
    });
    if (userExist) throw new Error("Usuário já cadastrado");

    const formattedBirthday = birthday
      ? new Date(birthday).toISOString().split(".")[0] + "Z"
      : null;

    const userCreated = await prisma.user.create({
      data: {
        userName,
        kit,
        course,
        period,
        birthday: formattedBirthday, // 👈 aqui usamos o novo valor
        hackaton,
        avaliableWork,
        profilePicture,
        apps,
        idPosition,
      },
    });

    return userCreated;
  } catch (error) {
    console.error("Erro ao criar usuario", error.message);
    throw error;
  }
}


export async function editUser({ idUser, userName, kit, course, period, birthday, hackaton, avaliableWork, profilePicture, apps, idPosition }) {
    try {
        const userExist = await prisma.user.findFirst({
            where: { idUser }
        })

        if (!userExist) throw new Error("Usuário não encontrado")

        const kitRegister = await prisma.user.findFirst({
            where: {
                kit,
                NOT: {
                    idUser: idUser
                }
            }
        })
        if (kitRegister) throw new Error("Kit já existe")


        const userUpdated = await prisma.user.update({
            where: { kit },
            data: {
                userName,
                course,
                period,
                birthday,
                hackaton,
                avaliableWork,
                profilePicture,
                apps,
                idPosition
            }
        });
        return userUpdated

    } catch (error) {
        console.error("Erro ao editar usuario", error.message);
        throw error;
    }
}
