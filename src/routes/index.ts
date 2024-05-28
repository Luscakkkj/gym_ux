import { Request, Response, Router } from 'express'
import { UserController } from 'src/controllers/user.controller'
const route = Router()

route.get('/', (_, response) => {
	return response.render('index')
})

route.get('/workout', (request: Request, response: Response) => {
	return response.render('ficha-treino')
})

route.get('/password', UserController.showChangePassword)

route.post('/password', UserController.alterPassword)

export { route as AuthRouter } from './auth.route'
export { route as TrainerRouter } from './trainer.route'
export { route as UserRouter } from './user.route'
export { route as MainRouter }
