import { Router } from 'express'
import { TrainerController } from 'src/controllers/trainer.controller'
import { TrainerMiddleware } from 'src/middlewares/TrainerMiddleware'
const route = Router()

route.get('/:trainerId', TrainerMiddleware, TrainerController.showDashboard)

route.get('/:trainerId/clients', TrainerController.showAllClients)

route.get('/:trainerId/client/:userId', TrainerController.showClientProfile)

route.post('/:trainerId/client', TrainerController.addClient)

route.delete('/:trainerId/client/:userId', TrainerController.removeClient)

/* Rotas de erro */
route.get('/:trainerId/client', (req, res) => {
	const { trainerId } = req.params
	return res.redirect(`trainer/${trainerId}/clients`)
})

route.use(TrainerMiddleware)

export { route }
