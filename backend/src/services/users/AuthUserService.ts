import prismaClient from '../../prisma'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

interface AuthResquest {
  email: string
  password: string 
}

class AuthUserService {
  async execute({ email, password }: AuthResquest) {
    // valida se o e-mail existe
    const user = await prismaClient.user.findFirst({
      where: {
        email: email
      }
    })
    
    if (!user) {
      throw new Error('Usuário não encontrado ou senha incorreta')
    }

    // Verifica senha
    const currentPassword = user.password
    let passwordMatch = true
    
    //console.log(hashedPassword, password)
    //const passwordMatch = await compare(password, user.password as string)
   // console.log(passwordMatch)

    if (currentPassword !== password) {
      passwordMatch = false
    }
    
    if (!passwordMatch) {
      throw new Error('Usuário não encontrado ou senha incorreta')
    }

    // autenticação com sucesso, gerar o token para o usuário
    const token = sign(
      {
        name: user.name,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn:'30d'
      }
    )

    return { 
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: token
     }
  }
}

export {  AuthUserService }