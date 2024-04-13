import prismaClient from '../../prisma'

interface AppointmentRequest {
  customer_id: string
}

class ListAppointmentByCustomerService {
  async execute({ customer_id }: AppointmentRequest) {
    const findByCustomer = prismaClient.appointments.findMany({
      where: {
        customerId: customer_id
      }
    })

    return findByCustomer
  }
}

export { ListAppointmentByCustomerService }