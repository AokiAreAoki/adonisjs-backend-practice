import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import RoleModel from 'App/Models/Role'
import Roles from '../../app/Enums/Roles'

export default class extends BaseSeeder {
	public async run() {
		await RoleModel.createMany([
			{
				id: Roles.ADMIN,
				name: 'admin',

				hasGrades: true,
				seeOthersGrades: true,
				editGrades: true,
				editSemesters: true,
			},
			{
				id: Roles.TEACHER,
				name: 'teacher',

				hasGrades: false,
				seeOthersGrades: true,
				editGrades: true,
				editSemesters: false,
			},
			{
				id: Roles.STUDENT,
				name: 'student',

				hasGrades: true,
				seeOthersGrades: false,
				editGrades: false,
				editSemesters: false,
			},
		])
	}
}
