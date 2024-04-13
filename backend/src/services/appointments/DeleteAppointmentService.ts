import prismaClient from '../../prisma'

interface AppointmentRequest {
  appointment_id: string
}

class DeleteAppointmentService {
  async execute({ appointment_id }: AppointmentRequest) {
    const appointment = prismaClient.appointments.delete({
      where: {
        id: appointment_id
      }
    })
    return appointment
  }
}

export { DeleteAppointmentService }