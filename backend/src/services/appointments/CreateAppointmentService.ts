import prismaClient from '../../prisma'

interface Appointment{
  description:string;
  start:string;
  closure?:string;
  status:boolean;
  userId:string;
  customerId:string;
}

class CreateAppointmentService {
  async execute({ description, start, status, closure, userId, customerId }: Appointment) {
   
    const appointment = prismaClient.appointments.create({
      data: {
        description: description,
        start: start,
        closure: closure,
        status: status,
        userId: userId,
        customerId: customerId
      }, select: {
        id: true
      }
    })
    return appointment
  }
}

export { CreateAppointmentService }
