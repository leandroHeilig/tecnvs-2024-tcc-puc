import { Request, Response } from 'express'
import { CreateProductService } from '../../services/consultancy/CreateProductService'

class CreateProductController {
  async handle(req: Request, res: Response) {
    const { name, price, description, category_id} =  req.body
    const createProductService = new CreateProductService()
    const product = await createProductService.execute({
      name,
      price,
      description,
      category_id,
    })

    return res.json(product)
  }
}

export { CreateProductController }