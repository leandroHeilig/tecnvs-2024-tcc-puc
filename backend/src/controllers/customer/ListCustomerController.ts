import { Request, Response } from 'express'
import { ListCustomerService } from '../../services/customer/ListCustomerService'

class ListCustomerController {
  async handle(req: Request, res: Response) {
    const listCustomers = new ListCustomerService()
    const customers = await listCustomers.execute()

    return res.json(customers)
  }

}

export { ListCustomerController } 