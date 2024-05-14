import prismaClient from '../../prisma'

interface AppointmentRequest {
  customer_id: string
}

class ListAppointmentService {
  async execute() {
    const appointment = prismaClient.appointments.findMany({
      where: {
        status: false     
      },
      orderBy: {
        created_at: 'desc'
      },
      include: {
        Customer:true
      }
    })

    return appointment
  }
}

export { ListAppointmentService }