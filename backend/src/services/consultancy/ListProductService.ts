import prismaClient from '../../prisma'

class ListProductService {
  async execute() {
    const categories = await prismaClient.services.findMany({
      select: {
        id: true,
        description: true        
      }
    })

    return categories
  }
}

export { ListProductService } 