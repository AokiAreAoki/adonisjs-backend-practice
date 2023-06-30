/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Route from '@ioc:Adonis/Core/Route'
import RoleModel from '../../../app/Models/Role'
import UserModel from '../../../app/Models/User'
import Roles from '../../../app/Enums/Roles'
import { User } from '../../../app/Types/User'

export default function students() {
	Route.group(() => {
		Route.get('list', async ({ response, auth }): Promise<User[] | void> => {
			const role = await RoleModel.find( auth.user!.roleId )

			if(!role?.seeOthersGrades)
				return response.forbidden()

			const students = await UserModel
				.query()
				.where( 'role_id', Roles.STUDENT )

			const serializedStudents = students.map( student => {
				const serializedStudent: User = {
					id: student.id,
					name: student.name,
					surname: student.surname,
					email: student.email,
				}

				return serializedStudent
			})

			return serializedStudents
		})
	})
		.prefix('/students')
		.middleware('authChecker')
}
