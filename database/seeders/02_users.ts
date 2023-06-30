import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Roles from 'App/Enums/Roles'
import UserModel from 'App/Models/User'

export default class extends BaseSeeder {
	public async run() {
		await UserModel.create({
			name: 'admin',
			surname: null,

			email: null,
			login: 'admin',
			password: 'admin',

			roleId: Roles.ADMIN,
		})

		const students = [
			'Billy William',
			'John Smith',
			'Emily Johnson',
			'David Rodriguez',
			'Sarah Thompson',
			'Michael Brown',
			'Jennifer Davis',
			'Robert Martinez',
			'Jessica Wilson',
			'William Lee',
			'Ashley Anderson',
		].map( fullName => {
			const [ name, surname ] = fullName.split( /\s+/ )
			return { name, surname }
		})

		await UserModel.createMany( students.map( student => ({
			name: student.name,
			surname: student.surname,

			email: `${student.name}.${student.surname}@gmail.com`,
			login: student.name.toLowerCase(),
			password: student.surname.toLowerCase(),

			roleId: Roles.STUDENT,
		})))

		const teachers = [
			'Lyudmila Sergeevna',
		].map( fullName => {
			const [ name, surname ] = fullName.split( /\s+/ )
			return { name, surname }
		})

		await UserModel.createMany( teachers.map( student => ({
			name: student.name,
			surname: student.surname,

			email: `${student.name}.${student.surname}@gmail.com`,
			login: student.name.toLowerCase(),
			password: student.surname.toLowerCase(),

			roleId: Roles.TEACHER,
		})))
	}
}
