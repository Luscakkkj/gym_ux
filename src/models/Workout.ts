import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	Model,
	Table,
} from 'sequelize-typescript'
import User from './User'

@Table({
	tableName: 'exercises',
})
export default class Exercise extends Model<Exercise> {
	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	})
	declare id: number

	@Column({
		type: DataType.STRING(255),
		allowNull: false,
	})
	declare type_workout: string

	@ForeignKey(() => User)
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	declare user_fk: number

	@Column({
		type: DataType.STRING(255),
		allowNull: false,
	})
	declare title: string

	@Column({
		type: DataType.STRING(255),
		allowNull: false,
	})
	declare description: string

	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	declare reps: number

	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	declare sets: number

	@Column({
		type: DataType.STRING(255),
		allowNull: false,
	})
	declare rest: string

	@BelongsTo(() => User)
	declare user: User
}
