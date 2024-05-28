import { Request, Response } from 'express'
import Staff from 'src/models/Staff'
import User from 'src/models/User'
import Workout from 'src/models/Workout'
import { sendEmailPassword } from 'src/utils/email'
import { userSchema } from 'src/validator/schemas/user-schema'

export class TrainerController {
	static async showDashboard(request: Request, response: Response) {
		try {
			const error = request.flash('error')
			const { trainerId } = request.params
			const staff = await Staff.findOne({ where: { staff_uuid: trainerId } })

			const [users, usersCount, workoutsCount] = await Promise.all([
				User.findAll({ limit: 10, order: [['id', 'DESC']] }),
				User.count(),
				Workout.count(),
			])

			return response.render(`trainer-home`, {
				partial: 'trainer/trainer-dashboard',
				users,
				staff,
				usersCount,
				workoutsCount,
				error,
			})
		} catch (error) {
			console.error(error)
			response.status(500).send('erro interno no servidor')
		}
	}

	static async showAllClients(request: Request, response: Response) {
		try {
			const { trainerId } = request.params
			const error = request.flash('error')

			const staff = await Staff.findOne({ where: { staff_uuid: trainerId } })
			const clients = await User.findAll()
			return response.render(`trainer-home`, {
				partial: 'trainer/trainer-allClients',
				staff,
				clients,
				error,
			})
		} catch (error) {
			console.error(error)
			response.status(500).send('erro interno no servidor')
		}
	}

	static async showClientProfile(request: Request, response: Response) {
		const { userId, trainerId } = request.params

		const [client, staff] = await Promise.all([
			User.findOne({ where: { user_uuid: userId } }),
			Staff.findOne({ where: { staff_uuid: trainerId } }),
		])

		if (!client) {
			request.flash('error', 'Usuário não encontrado')
			return response.redirect(`/trainer/${staff?.staff_uuid}/clients`)
		}

		return response.render('trainer-clientProfile', {
			client,
			staff,
		})
	}

	static async addClient(request: Request, response: Response) {
		const data = request.body
		const { trainerId } = request.params

		const { value, error } = userSchema.validate(data)

		const [user, staff] = await Promise.all([
			User.findOne({ where: { email: data.email } }),
			Staff.findOne({ where: { staff_uuid: trainerId } }),
			User.findAll(),
		])

		if (error) {
			request.flash('error', error.message)
			return response.redirect(`/trainer/${staff?.staff_uuid}/clients`)
		}

		if (!user) {
			const user = await User.create(value)
			sendEmailPassword(user.name, user.email, user.password)
			return response.redirect(`/trainer/${staff?.staff_uuid}/client`)
		}
	}

	static async removeClient(request: Request, response: Response) {
		const { trainerId, userId } = request.params
		const staff = await Staff.findOne({ where: { staff_uuid: trainerId } })
		await User.destroy({ where: { user_uuid: userId } })
		return response.redirect(`/trainer/${staff?.staff_uuid}/clients`)
	}
}
