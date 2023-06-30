import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class SemesterModel extends BaseModel {
	static get table() {
		return 'semesters';
	}

  @column({ isPrimary: true })
	public id: number

  @column()
  public year: number

  @column()
  public number: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  getWebFriendly(){
  	return {
  		id: this.id,
  		year: this.year,
  		number: this.number,
  		createdAt: this.createdAt,
  		updatedAt: this.updatedAt,
  	}}
}
