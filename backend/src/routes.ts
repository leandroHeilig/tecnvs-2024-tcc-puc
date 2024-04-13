import { Router } from 'express'
import multer from 'multer'

import { isAuthenticated } from './middlewares/isAuthenticated'

import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController'
import { DetailUserController } from './controllers/user/DetailUserController'

import { CreateCategoryController } from './controllers/category/CreateCategoryController'
import { ListCategoryController } from './controllers/category/ListCategoryController'
import { CreateProductController } from './controllers/consultancy/CreateProductConttroller'
import { ListByCategoryController } from './controllers/consultancy/ListByCategoryController'
import { CreateNewsLetterController } from './controllers/newsLetter/CreateNewsLetterController'
import { CreateOrderController } from './controllers/order/CreateOrderController'
import { CreateCustomerController } from './controllers/customer/CreateCustomerController'
import { DeleteOrderController } from './controllers/order/DeleteOrderController'
import { CreateAppointmentController } from './controllers/appointments/CreateAppointmentController'
import { DeleteAppointmentController } from './controllers/appointments/DeleteAppointmentController'
import { ListAppointmentsByCustomerController } from './controllers/appointments/ListAppointmentsByCustomerController'
import { ListAppointmentsByUserController } from './controllers/appointments/ListAppointmentsByUserController'

const router = Router()
//import uploadConfig from './config/multer'
//const upload = multer(uploadConfig.upload("../temp"))

// Rotas do usuário
router.post('/users', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)
router.get('/user', isAuthenticated, new DetailUserController().handle)

// Rotas de Categorias
router.post('/category', isAuthenticated, new CreateCategoryController().handle)
router.get('/category', isAuthenticated, new ListCategoryController().handle)

// Rotas de serviços (produtos) da consultoria
router.post('/product', isAuthenticated, new CreateProductController().handle)
router.get('/category/service', isAuthenticated, new ListByCategoryController().handle)

// Rota para cadastrar um e-mail na newsLetter
router.post('/newsletter', new CreateNewsLetterController().handle)

// Rota para gerar uma ordem de serviço
router.post('/order', isAuthenticated, new CreateOrderController().handle)
router.delete('/order', isAuthenticated, new DeleteOrderController().handle)

router.post('/appointment', isAuthenticated, new CreateAppointmentController().handle)
router.delete('/appointment', isAuthenticated, new DeleteAppointmentController().handle)
router.get('/appointment/customer', isAuthenticated, new ListAppointmentsByCustomerController().handle)
router.get('/appointment/user', isAuthenticated, new ListAppointmentsByUserController().handle)

// Rota para gerar um cliente
router.post('/customer',isAuthenticated, new CreateCustomerController().handle)

export  { router }