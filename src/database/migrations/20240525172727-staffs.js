'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('staffs', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			staff_uuid: {
				type: Sequelize.STRING(255),
				allowNull: false,
				unique: true,
			},
			photo: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			name: {
				type: Sequelize.STRING(255),
				allowNull: false,
			},
			email: {
				type: Sequelize.STRING(255),
				allowNull: false,
				unique: true,
			},
			role: {
				type: Sequelize.ENUM('admin', 'trainer'),
				allowNull: false,
				defaultValue: 'trainer',
			},
			phone: {
				type: Sequelize.STRING(255),
				allowNull: true,
				unique: true,
			},
			password: {
				type: Sequelize.STRING(255),
				allowNull: false,
			},
		})
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('staffs')
	},
}
