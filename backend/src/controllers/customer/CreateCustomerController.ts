import { Request, Response } from 'express'
import { CreateCustomerService } from '../../services/customer/CreateCustomerService'

class CreateCustomerController {
  async handle(req: Request, res: Response) {
    const { name, phone, email, address } = req.body
    const createCustomerService = new CreateCustomerService()
    const customer = await createCustomerService.execute({
      name,
      phone,
      email,
      address
    })

    console.log(customer)

    return res.json(customer)
    
  }
}

export { CreateCustomerController }