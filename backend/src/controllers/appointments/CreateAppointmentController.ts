import { Request, Response } from 'express'
import { CreateAppointmentService } from '../../services/appointments/CreateAppointmentService'

class CreateAppointmentController {
  async handle(req: Request, res: Response) {

    const { description, start, status, closure, userId, customerId } = req.body

    const createAppointment = new CreateAppointmentService()

    const appointment = await createAppointment.execute({
      description,
      start,
      status,
      closure,
      userId,
      customerId
    })

    return res.json(appointment)
  }
}

export { CreateAppointmentController }