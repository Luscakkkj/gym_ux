import {
	BeforeCreate,
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	Model,
	Table,
} from 'sequelize-typescript'
import ShortUniqueId from 'short-unique-id'
import User from './User'

const { randomUUID } = new ShortUniqueId({ length: 10 })

@Table({ tableName: 'tips' })
export default class Tip extends Model {
	@Column({
		type: DataType.STRING(255),
		unique: true,
		allowNull: false,
	})
	tip_uuid: string

	@ForeignKey(() => User)
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	user_fk: number

	@Column({
		type: DataType.TEXT('medium'),
		allowNull: true,
	})
	tip: string | null

	@Column({
		type: DataType.DATE,
		allowNull: false,
	})
	declare updatedAt: Date

	@BelongsTo(() => User)
	user: User

	@BeforeCreate
	static generateUUID(instance: Tip) {
		instance.tip_uuid = randomUUID()
	}
}
