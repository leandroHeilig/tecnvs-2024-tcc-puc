import { Router } from 'express'
import { isAuthenticated } from './middlewares/isAuthenticated'

import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController'
import { DetailUserController } from './controllers/user/DetailUserController'


import { CreateCategoryController } from './controllers/category/CreateCategoryController'
import { ListCategoryController } from './controllers/category/ListCategoryController'
import { CreateProductController } from './controllers/consultancy/CreateProductConttroller'

const router = Router()

// Rotas do usuário
router.post('/users', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)
router.get('/user', isAuthenticated, new DetailUserController().handle)

// Rotas de Categorias
router.post('/category', isAuthenticated, new CreateCategoryController().handle)
router.get('/category', isAuthenticated, new ListCategoryController().handle)

// Rotas de serviços (produtos) da consultoria
router.post('/product', isAuthenticated, new CreateProductController().handle)

export  {router}