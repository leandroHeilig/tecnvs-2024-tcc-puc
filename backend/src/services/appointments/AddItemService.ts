import prisnaClient from '../../prisma'

interface ItemRequest {
  appointment_id: string
  service_id: string
  amount: number
}

class AddItemService {
  async execute({ appointment_id, service_id, amount }: ItemRequest) {
    const appointment = await prisnaClient.item.create({
      data: {
        appointment_id: appointment_id,
        service_id: service_id,
        amount: amount
      }
    }) 

    return appointment
  }
}

export { AddItemService } 