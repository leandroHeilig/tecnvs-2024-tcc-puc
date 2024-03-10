import { Request, Response, response } from 'express'

import { CreateUserService } from '../../services/users/CreateUserService'

class CreateUserController { 
  async handle(req: Request, res: Response) {
  
    const { name, email, password } = req.body
    const createUserServivce = new CreateUserService()

    const user = await createUserServivce.execute({
      name,
      email,
      password
    })

    return res.json(user)
  }
}

export { CreateUserController }