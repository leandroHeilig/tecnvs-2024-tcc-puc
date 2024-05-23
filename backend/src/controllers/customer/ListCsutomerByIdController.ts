import { Request, Response } from 'express'
import { ListCustomerByIdService } from '../../services/customer/ListCustomerByIdService'

class ListCsutomerByIdController {
  async handle(req: Request, res: Response) {
    const customer_id = req.query.customer_id as string
    const listCustomerById = new ListCustomerByIdService().execute({ customer_id })

    return res.json(listCustomerById)
  }
}

export { ListCsutomerByIdController }