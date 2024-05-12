import prisnaClient from '../../prisma'

interface ApointmentRequest {
  appointment_id: string
}

class AproveAppointmentService{ 
  async execute({ appointment_id }: ApointmentRequest) {
    const appointement = await prisnaClient.appointments.update({
      where: {
        id: appointment_id
      },
      data: {
        status:true
      }
    })
    return appointement
  }
}

export { AproveAppointmentService }