'use strict'

/** @type {import('sequelize-cli').Migration} */

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('exercises', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			type_workout: {
				type: Sequelize.STRING(255),
				allowNull: false,
			},
			user_fk: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'users',
					key: 'id',
				},
				onDelete: 'CASCADE',
			},
			title: {
				type: Sequelize.STRING(255),
				allowNull: false,
			},
			description: {
				type: Sequelize.STRING(255),
				allowNull: false,
			},
			reps: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			sets: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			rest: {
				type: Sequelize.STRING(255),
				allowNull: false,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		})
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('exercises')
	},
}
