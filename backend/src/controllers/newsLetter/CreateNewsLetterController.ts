import { Request, Response } from 'express'
import { CreateNewsLetterService } from '../../services/newsletter/CreateNewsLetterService'

class CreateNewsLetterController {
  async handle(req: Request, res: Response) {
    const { email } = req.body
    const createNewsLetterService = new CreateNewsLetterService()

    const newsLetter = await createNewsLetterService.execute({
      email
    })

    return res.json(newsLetter)
  }
}

export { CreateNewsLetterController }