import prismaClient from '../../prisma'

interface Appointment{
  serviceId:string
  description:string;
  start:string;
  closure:string;
  status:boolean;
  userId:string;
  customerId:string;
}

class CreateAppointmentService {
  async execute({ serviceId, description, start, status, closure, userId, customerId }: Appointment) {
    console.log(serviceId)
    const appointment = prismaClient.appointments.create({
      data: {
        serviceId: serviceId,
        description: description,
        start: start,
        closure: closure,
        status: status,
        userId: userId,
        customerId: customerId
      }, select: {
        id: true,
        serviceId:true
      }
    })
    return appointment
  }
}

export { CreateAppointmentService }
