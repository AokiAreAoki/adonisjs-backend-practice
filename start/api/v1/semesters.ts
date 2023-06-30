/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Route from '@ioc:Adonis/Core/Route'
import { getSemesters } from '../../../app/Utils/getSemesters'
import RoleModel from '../../../app/Models/Role'
import SemesterModel from '../../../app/Models/Semester'
import { Semester } from '../../../app/Types/Semester'

export default function semesters() {
	Route.group(() => {
		Route.get('list', (): Promise<Semester[]> => getSemesters() )

		Route.post('add', async ({ request, response, auth }): Promise<Semester | void> => {
			const role = await RoleModel.find( auth.user!.roleId )

			if( !role?.editSemesters )
				return response.forbidden()

			const only = request.only([ 'year', 'number' ])
			const year = Number( only.year )
			const number = Number( only.number )

			const badValues = {
				year: isNaN(year) || year <= 0,
				number: isNaN(number) || number <= 0,
			}

			if( Object.values(badValues).some( b => b ) )
				return response.badRequest({
					error: `${Object
						.keys( badValues)
						.filter( key => badValues[key] )
						.map( key => `\`${key}\`` )
						.join( ', ' )
					} must be a valid number(s) greater than 0`
				})

			const semester = await SemesterModel
				.query()
				.where( 'year', year )
				.andWhere( 'number', number )

			if(semester.length !== 0)
				return response.badRequest({ error: `This semester already exists` })

			const newSemester = await SemesterModel.create({
				year,
				number,
			})

			return newSemester
				? {
					id: newSemester.id,
					year: newSemester.year,
					number: newSemester.number,
				}
				: response.internalServerError({ error: `Failed to create a semester` })
		})
	})
		.prefix('/semesters')
		.middleware('authChecker')
}
