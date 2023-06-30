/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Route from '@ioc:Adonis/Core/Route'
import RoleModel from '../../../app/Models/Role'
import { UserWithRole } from '../../../app/Types/User'

export default function user() {
	Route.group(() => {
		Route.get('info', async ({ response, auth }) => {
			const role = await RoleModel.findBy('id', auth.user!.roleId)

			if (!role)
				return response.internalServerError({ error: `Failed to get user role info` })

			const userData: UserWithRole = {
				id: auth.user!.id,
				name: auth.user!.name,
				surname: auth.user!.surname,
				email: auth.user!.email,
				role: {
					id: role.id,
					name: role.name,
					hasGrades: Boolean(role.hasGrades),
					canSeeOthersGrades: Boolean(role.seeOthersGrades),
					canEditGrades: Boolean(role.editGrades),
					canEditSemesters: Boolean(role.editSemesters),
				}
			}

			return userData
		})
	})
		.prefix('/user')
		.middleware('authChecker')
}
