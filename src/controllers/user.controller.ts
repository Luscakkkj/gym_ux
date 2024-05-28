import { hash } from 'bcrypt'
import { Request, Response } from 'express'
import User from 'src/models/User'

export class UserController {
	static async showDashboard(request: Request, response: Response) {
		const { userId } = request.params
		console.log(userId)

		const user = await User.findOne({ where: { user_uuid: userId } })
		response.render('user-home', {
			partial: 'user/user-dashboard',
			user,
		})
	}

	static async showWorkouts(request: Request, response: Response) {
		const { userId } = request.params
		console.log(userId)

		const user = await User.findOne({ where: { user_uuid: userId } })
		response.render('user-home', {
			partial: 'user/user-workouts',
			user,
		})
	}

	static async showChangePassword(request: Request, response: Response) {
		const error = request.flash('error')
		return response.render('password', { error })
	}

	static async alterPassword(request: Request, response: Response) {
		const data = request.body

		try {
			if (Object.values(data).some(value => value == '')) {
				request.flash('error', 'Preencha todos os campos')
				return response.redirect('/password')
			}

			const user = await User.findOne({ where: { password: data.oldpass } })
			if (!user) {
				request.flash('error', 'Usuário não encontrado')
				return response.redirect('/password')
			}
			user.password = await hash(data.newpass, 10)
			await user.save()
			return response.redirect(`/login`)
		} catch (error) {
			console.log(error)
			return response.status(500).send('erro interno no servidor')
		}
	}
}
