import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ScoreModel extends BaseModel {
	static get table() {
		return 'scores';
	}

  @column({ isPrimary: true })
	public id: number

  @column()
  public subject: string

  @column()
  public assessmentType: string

  @column()
  public value: number

  @column()
  public studentId: number

  @column()
  public semesterId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  getWebFriendly(){
  	return {
  		id: this.id,
  		subject: this.subject,
  		assessmentType: this.assessmentType,
  		value: this.value,
  		studentId: this.studentId,
  		semesterId: this.semesterId,
  		createdAt: this.createdAt,
  		updatedAt: this.updatedAt,
  	}
  }
}
