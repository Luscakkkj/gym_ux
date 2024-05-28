import { NextFunction, Request, Response } from 'express'
import Staff from 'src/models/Staff'

export const TrainerMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { trainerId } = req.params
		console.log(req.params)

		const staff = await Staff.findOne({ where: { staff_uuid: trainerId } })

		if (!staff) {
			return res.status(404).send('Usuário não encontrado')
		}
		next()
	} catch (error) {
		next(error)
	}
}
