import { Request, Response } from 'express'
import { ListCustomerByIdService } from '../../services/customer/ListCustomerByIdService'

class ListCsutomerByIdController {
  async handle(req: Request, res: Response) {
    const customer_id = req.query.customer_id as string
    
    const listCustomerById = new ListCustomerByIdService()
    const customerDetails = await listCustomerById.execute({ customer_id })

    return res.json(customerDetails)
  }
}

export { ListCsutomerByIdController }