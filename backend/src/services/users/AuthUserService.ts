import prismaClient from '../../prisma'
import { compare, compareSync } from 'bcryptjs'

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
    
    console.log(currentPassword)
    console.log(password)

    //console.log(hashedPassword, password)
    //const passwordMatch = await compare(password, user.password as string)
   // console.log(passwordMatch)

    if (currentPassword !== password) {
      passwordMatch = false
    }
    
    if (!passwordMatch) {
      throw new Error('Usuário não encontrado ou senha incorreta')
    }

    return { ok: true }
  }
}

export {  AuthUserService }