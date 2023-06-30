import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import Roles from '../Enums/Roles'

export default class UserModel extends BaseModel {
	static get table() {
		return 'users';
	}

	@column({ isPrimary: true })
	public id: number

	@column()
	public name: string

	@column()
	public surname: string | null

	@column()
	public email: string | null

	@column()
	public login: string | null

	@column()
	public password: string

	@column()
	public roleId: Roles

	@beforeSave()
	public static async hashPassword(user: UserModel) {
		if (user.$dirty.password)
			user.password = await Hash.make(user.password)
	}

	@column.dateTime({ autoCreate: true })
	public createdAt: DateTime

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	public updatedAt: DateTime

	getWebFriendly(){
		return {
			id: this.id,
			name: this.name,
			surname: this.surname,
			email: this.email,
			login: this.login,
			roleId: this.roleId,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
		}}
}
