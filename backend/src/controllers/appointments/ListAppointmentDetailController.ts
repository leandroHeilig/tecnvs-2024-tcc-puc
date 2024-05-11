import { Request, Response } from 'express'
import { ListAppointmentDetailService } from '../../services/appointments/ListAppointmentDetailService'

class ListAppointmentDetailController {
  async handle(req: Request, res: Response) {
    const appointment_id = req.query.appointment_id as string

    const listByUser = new ListAppointmentDetailService()
    const appointmentDetail = await listByUser.execute({ appointment_id })

    return res.json(appointmentDetail)    
  }
}

export { ListAppointmentDetailController }