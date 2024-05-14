import { Request, Response } from 'express'
import { ListAppointmentService  } from '../../services/appointments/ListAppointmentService'

class ListAppointmentsController{
  async handle(req: Request, res: Response) {
    
    const listAppointments = new ListAppointmentService()
    const appointments = await listAppointments.execute()

    return res.json(appointments)    
  }
}

export { ListAppointmentsController }