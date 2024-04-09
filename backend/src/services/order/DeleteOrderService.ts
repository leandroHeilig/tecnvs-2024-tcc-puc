import prismaClient from '../../prisma'

interface OrderRequest {
  order_id: string
}

class DeleteOrderService {
  async execute({ order_id }: OrderRequest) {
    const order = await prismaClient.orders.delete({
      where: {
        id: order_id
      }
    })

    return order
    
  }

}

export { DeleteOrderService }