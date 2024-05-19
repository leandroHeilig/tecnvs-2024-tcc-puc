import { Request, Response } from 'express'
import {  ListProductService } from '../../services/consultancy/ListProductService'

class ListAllProductsController {
  async handle(req: Request, res: Response) {
    const listProducts = new ListProductService()
    const servicesConsultancy = await listProducts.execute()

    return res.json(servicesConsultancy)
  }
}

export { ListAllProductsController }
