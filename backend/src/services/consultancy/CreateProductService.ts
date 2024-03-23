import prismaClient from '../../prisma'

interface ProductRequest {
  price: string,
  description: string,
  category_id: string,  
}

class CreateProductService {
  async execute({  price, description, category_id }: ProductRequest) {

    const product = await prismaClient.services.create({
      data: {        
        price: parseFloat(price),
        description: description,
        categoryId: category_id
      }
    })

    return product
  }
}

export { CreateProductService }