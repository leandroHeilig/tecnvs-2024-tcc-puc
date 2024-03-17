import { Router } from 'express'

import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController'
import { DetailUserController } from './controllers/user/DetailUserController'

import { isAuthenticated } from './middlewares/isAuthenticated'
import { CreateCategoryController } from './controllers/category/CreateCategoryController'

const router = Router()

// Rotas do usuário
router.post('/users', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)
router.get('/user', isAuthenticated, new DetailUserController().handle)

// Rotas de Categorias
router.post('/categories', isAuthenticated, new CreateCategoryController().handle)

export  {router}