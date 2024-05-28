import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import Staff from 'src/models/Staff'
import User from 'src/models/User'

export class AuthController {
	static async showLogin(request: Request, response: Response) {
		const error = request.flash('error')
		return response.render('login', { error })
	}

	//AUTENTICAÇÃO DO SUPERIORES (ADM/TREINADOR)
	static async storeStaff(request: Request, response: Response) {
		const data = request.body

		try {
			if (Object.values(data).some(value => value == '')) {
				request.flash('error', 'Preencha todos os campos')
				return response.redirect('/login')
			}

			const staff = await Staff.findOne({ where: { email: data.email } })
			if (!staff) {
				request.flash('error', 'Usuário não encontrado')
				return response.redirect('/login')
			}

			const verifyPassword = await bcrypt.compare(data.password, staff.password)
			if (!verifyPassword) {
				request.flash('error', 'Senha inválida')
				return response.redirect('/login')
			}

			if (staff.role === 'trainer') {
				request.session.activeUser = staff.staff_uuid
				return response.redirect(`/trainer/${staff.staff_uuid}`)
			}

			if (staff.role === 'admin') {
				request.session.activeUser = staff.staff_uuid
				return response.redirect(`/adm/${staff.staff_uuid}`)
			}
		} catch (error) {
			console.error(error)
			response.status(500).send('erro interno no servidor')
		}
	}

	//AUTENTICAÇÃO DO CLIENTES
	static async storeUser(request: Request, response: Response) {
		const data = request.body

		try {
			if (Object.values(data).some(value => value == '')) {
				request.flash('error', 'Preencha todos os campos')
				return response.redirect('/login')
			}

			const user = await User.findOne({ where: { email: data.email } })

			if (!user) {
				request.flash('error', 'Usuário não encontrado')
				return response.redirect('/login')
			}

			const verifyPassword = await bcrypt.compare(data.password, user.password)
			if (!verifyPassword) {
				request.flash('error', 'Senha inválida')
				return response.redirect('/login')
			}

			request.session.activeUser = user.user_uuid
			return response.redirect(`/user/${user.user_uuid}`)
		} catch (error) {
			console.error(error)
			response.status(500).send('erro interno no servidor')
		}
	}

	//LOGOUT DA SESÃO
	static async delete(_, response: Response) {
		response.redirect('/login')
	}
}
