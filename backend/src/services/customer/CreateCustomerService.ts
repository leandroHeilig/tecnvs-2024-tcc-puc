import prismaClient from '../../prisma'

interface CustomerRequest {
  name: string;
  phone: string;
  email: string;
  address: string;
}

class CreateCustomerService {
  async execute({ name, phone, email, address }: CustomerRequest) {

    if (!email) {
      throw new Error('e-mail incorreto')
    }

    const customerAlreadyExists = await prismaClient.customer.findFirst({
      where: {
        email: email
      }
    })

    if (customerAlreadyExists) {
      throw new Error('Cliente já cadastrado')
    }

    const customer = await prismaClient.customer.create({
      data: {
        name: name,
        phone: phone,
        email: email,
        address: address
      },
      select: {
        id: true,
        email: true
      }
    })

    return customer
  }

}

export { CreateCustomerService }