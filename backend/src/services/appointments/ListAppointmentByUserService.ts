import prismaClient from '../../prisma'

interface AppointmentRequest {
  user_id: string
}

class ListAppointmentByUserService {
  async execute({ user_id }: AppointmentRequest) {
    const findByCustomer = prismaClient.appointments.findMany({
      where: {
        userId: user_id
      }
    })

    return findByCustomer
  }
}

export { ListAppointmentByUserService }