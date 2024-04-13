import { Request, Response } from 'express'
import { ListAppointmentByCustomerService } from '../../services/appointments/ListAppointmentByCustomerService'

class ListAppointmentsByCustomerController{
  async handle(req: Request, res: Response) {
    const customer_id = req.query.customer_id as string

    const listByCustomer = new ListAppointmentByCustomerService()
    const appointmentsByCustomer = await listByCustomer.execute({ customer_id })

    return res.json(appointmentsByCustomer)    
  }
}

export { ListAppointmentsByCustomerController }