import prismaClient from '../../prisma'

class ListCustomerService {
  async execute() {
    const customer = await prismaClient.customer.findMany({
      select: {
        id: true,
        name: true
      }
    })

    return customer
    
  }
}

export { ListCustomerService } 