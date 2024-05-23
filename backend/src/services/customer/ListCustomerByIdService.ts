import prismaClient from '../../prisma'

interface CustomerRequest {
  customer_id: string;
}

class ListCustomerByIdService {
  async execute({ customer_id }: CustomerRequest) {

    const findCustomerById = await prismaClient.customer.findMany({
      where: {
        id: customer_id
      }
    })

    return findCustomerById;

  }
}

export { ListCustomerByIdService } 