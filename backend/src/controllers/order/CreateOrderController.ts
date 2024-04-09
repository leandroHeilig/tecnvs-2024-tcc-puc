import { Request, Response } from 'express'
import { CreateOrderService } from '../../services/order/CreateOrderService'

class CreateOrderController {
  async handle(req: Request, res: Response) {
    const { customer, user, description, status, start, closure } = req.body

    const createOrderService = new CreateOrderService()
    
    const order = await createOrderService.execute({
      customer,
      user,
      description,
      status,
      start,
      closure
    })

    return res.json(order)
    
  }

}

export { CreateOrderController }