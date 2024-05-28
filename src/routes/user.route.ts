import { Request, Response, Router } from 'express'
import { UserController } from 'src/controllers/user.controller'
import { UserMiddleware } from 'src/middlewares/UserMiddleware'
const route = Router()

/* Mostrar tela inical */
route.get('/:userId', UserController.showDashboard)

/* Mostrar Treinos */
route.get('/:userId/workout/', UserController.showWorkouts)



route.use(UserMiddleware)

export { route }
