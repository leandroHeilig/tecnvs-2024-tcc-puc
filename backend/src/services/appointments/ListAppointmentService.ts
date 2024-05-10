import prismaClient from '../../prisma'

interface AppointmentRequest {
  customer_id: string
}

class ListAppointmentService {
  async execute() {
    const appointment = prismaClient.appointments.findMany({
      where: {
     
      },
      orderBy: {
        created_at: 'desc'
      }
    })

    return appointment
  }
}

export { ListAppointmentService }