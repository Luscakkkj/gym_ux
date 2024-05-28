'use strict'
const { hash } = require('bcrypt')
const ShortUniqueId = require('short-unique-id')

const {randomUUID} = new ShortUniqueId({ length: 10 })

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		// Hash das senhas
		const passwordHash = await hash('senhaSegura', 10)
		const adminPasswordHash = await hash('admin123', 10)

		await queryInterface.bulkInsert('staffs', [
			{
				staff_uuid: randomUUID(),
				name: 'Lucas',
				email: 'lucasdepauloldp1@gmail.com',
				role: 'trainer',
				phone: '(88) 99308-4144',
				password: passwordHash,
			},
			{
				staff_uuid: randomUUID(),
				name: 'Maria',
				email: 'maria@exemplo.com',
				role: 'trainer',
				phone: '(88) 99222-1234',
				password: passwordHash,
			},
			{
				staff_uuid: randomUUID(),
				name: 'João',
				email: 'joao@exemplo.com',
				role: 'trainer',
				phone: '(88) 99111-5678',
				password: passwordHash,
			},
			{
				staff_uuid: randomUUID(),
				name: 'Ana',
				email: 'ana@exemplo.com',
				role: 'trainer',
				phone: '(88) 99444-7890',
				password: passwordHash,
			},
			{
				staff_uuid: randomUUID(),
				name: 'Pedro',
				email: 'pedro@exemplo.com',
				role: 'trainer',
				phone: '(88) 99777-3333',
				password: passwordHash,
			},
			{
				staff_uuid: randomUUID(),
				name: 'Sara',
				email: 'sara@exemplo.com',
				role: 'trainer',
				phone: '(88) 99666-2222',
				password: passwordHash,
			},
			{
				staff_uuid: randomUUID(),
				name: 'Carlos',
				email: 'carlos@exemplo.com',
				role: 'trainer',
				phone: '(88) 99555-1111',
				password: passwordHash,
			},
			{
				staff_uuid: randomUUID(),
				name: 'Admin',
				email: 'admin@admin.com',
				role: 'admin',
				phone: '(88) 99000-0000',
				password: adminPasswordHash,
			},
		])
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('staffs', null, {})
	},
}
