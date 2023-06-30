import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class RoleModel extends BaseModel {
	static get table() {
		return 'roles';
	}

  @column({ isPrimary: true })
	public id: number

  @column()
  public name: string

  @column()
  public hasGrades: boolean

  @column()
  public seeOthersGrades: boolean

  @column()
  public editGrades: boolean

  @column()
  public editSemesters: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  getWebFriendly(){
  	return {
  		id: this.id,
  		name: this.name,
  		hasGrades: this.hasGrades,
  		seeOthersGrades: this.seeOthersGrades,
  		editGrades: this.editGrades,
  		editSemesters: this.editSemesters,
  		createdAt: this.createdAt,
  		updatedAt: this.updatedAt,
  	}
  }
}
