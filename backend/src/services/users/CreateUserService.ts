import PrismaClient from '../../prisma'

interface UserRequest {
  name: string
  email: string
  password: string
}

class CreateUserService {
  async execute({ name, email, password }: UserRequest) {
    // Valida envio de e-mail
    if (!email) {
      throw new Error('e-mail incorreto')
    }

    // e-mail já existe na base?
    const userAlreadyExists = await PrismaClient.user.findFirst({
      where: {
        email: email
      }
    })

    if (userAlreadyExists) {
      throw new Error('Usuário já cadastrado')
    }

    const user = await PrismaClient.user.create({
      data: {
        name,
        email,
        password
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    })

    return { user }
  }
}
export { CreateUserService }
