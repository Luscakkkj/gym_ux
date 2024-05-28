import { NextFunction, Request, Response } from 'express'
import User from 'src/models/User'

export const UserMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { userId } = req.params
		console.log(req.params)

		const user = await User.findOne({ where: { user_uuid: userId } })

		if (!user) {
			return res.status(404).send('Usuário não encontrado')
		}
		next()
	} catch (error) {
		next(error)
	}
}
