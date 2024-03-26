import prismaClient from '../../prisma'

interface NewsLetterRequest {
  email: string
}

class CreateNewsLetterService {
  async execute({ email }: NewsLetterRequest) {
    const newsLetter = await prismaClient.newsletter.create({
      data: {
        email: email
      }
    })
    return newsLetter
  }

}

export {CreateNewsLetterService}