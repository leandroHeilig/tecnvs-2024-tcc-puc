import prismaClient from '../../prisma'

interface OrderRequest {
  customer: string;
  user: string;
  description: string;
  status: boolean;
  start: string;
  closure: string
 }

class CreateOrderService {
  
  async execute({ customer, user, description, status, start,closure }: OrderRequest) {

    const order = await prismaClient.order.create({
      data:{
        customerId: customer,
        userId: user,
        description: description,
        status: status,
        start: start,
        closure: closure,
        items: {}
      },
      select: {
        id: true,
        customerId: true
      }
    })    
    return order
  }
}

export { CreateOrderService } 