import { Request, Response } from 'express'
import { AddItemService } from '../../services/appointments/AddItemService'

class AddItemController {
  async handle(req: Request, res: Response) {
    const { appointment_id, service_id, amount } = req.body

    const addItem = new AddItemService()
    const appointment = await addItem.execute({
      appointment_id,
      service_id,
      amount
    })

    return res.json(appointment)

  }
}

export { AddItemController } 