import { Request, Response } from 'express'
import { DeleteAppointmentService } from '../../services/appointments/DeleteAppointmentService'

class DeleteAppointmentController {
  async handle(req: Request, res: Response) {
    const appointment_id = req.query.appointment_id as string
    const deleteAppointmentService = new DeleteAppointmentService()

    const appointment = await deleteAppointmentService.execute({
      appointment_id
    })

    return res.json(appointment)
  }
}

export { DeleteAppointmentController }

  