import { Request, Response } from 'express'
import { AproveAppointmentService } from '../../services/appointments/AproveAppointmentService'

class AproveAppointmentController {
  async handle(req: Request, res: Response ) {
    const { appointment_id } = req.body
    const aproveAppointment = new AproveAppointmentService()

    const approval = await aproveAppointment.execute({
      appointment_id
    })

    return res.json(approval)    
  }
}

export { AproveAppointmentController }
