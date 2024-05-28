import { hash } from 'bcrypt'
import { BeforeCreate, Column, DataType, Model, Table } from 'sequelize-typescript'
import ShortUniqueId from 'short-unique-id'

const { randomUUID } = new ShortUniqueId({ length: 10 })

@Table({
	tableName: 'staffs',
})
export default class Staff extends Model {
	@Column({
		type: DataType.STRING(255),
		allowNull: false,
		unique: true,
	})
	declare staff_uuid: string

	@Column({
		type: DataType.STRING(255),
		allowNull: true,
	})
	declare photo: string | null

	@Column({
		type: DataType.STRING(255),
		allowNull: false,
	})
	declare name: string

	@Column({
		type: DataType.STRING(255),
		allowNull: false,
		unique: true,
	})
	declare email: string

	@Column({
		type: DataType.ENUM('admin', 'trainer'),
		allowNull: false,
		defaultValue: 'trainer',
	})
	declare role: 'admin' | 'trainer'

	@Column({
		type: DataType.STRING(255),
		allowNull: true,
		unique: true,
	})
	declare phone: string | null

	@Column({
		type: DataType.STRING(255),
		allowNull: false,
		field: 'password',
	})
	declare password: string

	@BeforeCreate
	static async generateUUIDAndPassword(instance: Staff) {
		instance.staff_uuid = randomUUID()
		instance.password = await hash(instance.password, 10)
	}
}
