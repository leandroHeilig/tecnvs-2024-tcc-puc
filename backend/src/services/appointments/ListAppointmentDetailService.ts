import prismaClient from '../../prisma'

interface AppointmentRequest {
  appointment_id: string
}

class ListAppointmentDetailService {
  async execute({ appointment_id }: AppointmentRequest) {
    const appointment = await prismaClient.item.findMany({
      where: {
        appointment_id: appointment_id
      },
      include: {
        service: true,
        appointments:true
      }
    })

    return appointment
  }
}

export { ListAppointmentDetailService }