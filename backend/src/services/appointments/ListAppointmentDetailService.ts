import prismaClient from '../../prisma'

interface AppointmentRequest {
  appointment_id: string
}

class ListAppointmentDetailService {
  async execute({ appointment_id }: AppointmentRequest) {
    const appointment = prismaClient.appointments.findMany({
      where: {
        id: appointment_id
      }
    })

    return appointment
  }
}

export { ListAppointmentDetailService }