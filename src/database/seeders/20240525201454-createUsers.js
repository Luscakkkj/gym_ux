'use strict'
const { hash } = require('bcrypt')
const ShortUniqueId = require('short-unique-id')

const { randomUUID } = new ShortUniqueId({ length: 10 })

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		// Hash das senhas
		const passwordHash = await hash('senhaSegura', 10)

		// Inserir 10 usuários
		await queryInterface.bulkInsert('users', [
			{
				user_uuid: randomUUID(),
				name: 'Lucas',
				email: 'lucasdepauloldp1@gmail.com',
				sex: 'Masculino',
				age: 25,
				phone: '(88) 99308-4144',
				password: passwordHash,
				state: 'Iniciante',
				focus: 'Hipertrofia',
			},
			{
				user_uuid: randomUUID(),
				name: 'Maria',
				email: 'maria@exemplo.com',
				sex: 'Feminino',
				age: 30,
				phone: '(88) 99222-1234',
				password: passwordHash,
				state: 'Intermediário',
				focus: 'Emagrecimento',
			},
			{
				user_uuid: randomUUID(),
				name: 'João',
				email: 'joao@exemplo.com',
				sex: 'Masculino',
				age: 35,
				phone: '(88) 99111-5678',
				password: passwordHash,
				state: 'Avançado',
				focus: 'Funcional',
			},
			{
				user_uuid: randomUUID(),
				name: 'Ana',
				email: 'ana@exemplo.com',
				sex: 'Feminino',
				age: 40,
				phone: '(88) 99444-7890',
				password: passwordHash,
				state: 'Iniciante',
				focus: 'Hipertrofia',
			},
			{
				user_uuid: randomUUID(),
				name: 'Pedro',
				email: 'pedro@exemplo.com',
				sex: 'Masculino',
				age: 45,
				phone: '(88) 99777-3333',
				password: passwordHash,
				state: 'Intermediário',
				focus: 'Emagrecimento',
			},
			{
				user_uuid: randomUUID(),
				name: 'Sara',
				email: 'sara@exemplo.com',
				sex: 'Feminino',
				age: 50,
				phone: '(88) 99666-2222',
				password: passwordHash,
				state: 'Avançado',
				focus: 'Funcional',
			},
			{
				user_uuid: randomUUID(),
				name: 'Carlos',
				email: 'carlos@exemplo.com',
				sex: 'Masculino',
				age: 55,
				phone: '(88) 99555-1111',
				password: passwordHash,
				state: 'Iniciante',
				focus: 'Hipertrofia',
			},
			{
				user_uuid: randomUUID(),
				name: 'Mariana',
				email: 'mariana@exemplo.com',
				sex: 'Feminino',
				age: 60,
				phone: '(88) 99888-8888',
				password: passwordHash,
				state: 'Intermediário',
				focus: 'Emagrecimento',
			},
			{
				user_uuid: randomUUID(),
				name: 'Felipe',
				email: 'felipe@exemplo.com',
				sex: 'Masculino',
				age: 65,
				phone: '(88) 99999-9999',
				password: passwordHash,
				state: 'Avançado',
				focus: 'Funcional',
			},
			{
				user_uuid: randomUUID(),
				name: 'Amanda',
				email: 'amanda@exemplo.com',
				sex: 'Feminino',
				age: 70,
				phone: '(88) 99777-7777',
				password: passwordHash,
				state: 'Iniciante',
				focus: 'Hipertrofia',
			},
		])
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('users', null, {})
	},
}
