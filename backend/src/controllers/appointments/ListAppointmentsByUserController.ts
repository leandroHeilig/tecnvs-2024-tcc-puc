import { Request, Response } from 'express'
import { ListAppointmentByUserService  } from '../../services/appointments/ListAppointmentByUserService'

class ListAppointmentsByUserController{
  async handle(req: Request, res: Response) {
    const user_id = req.query.user_id as string

    const listByUser = new ListAppointmentByUserService()
    const appointmentsByUser = await listByUser.execute({ user_id })

    return res.json(appointmentsByUser)    
  }
}

export { ListAppointmentsByUserController }