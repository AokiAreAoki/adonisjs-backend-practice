/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Route from '@ioc:Adonis/Core/Route'
import UserModel from '../../../app/Models/User'
import RoleModel from '../../../app/Models/Role'
import getUserScores from '../../../app/Utils/getUserScores'
import makeLookupTable from '../../../app/Utils/makeLookupTable'
import { getSemestersWithScore } from '../../../app/Utils/getSemesters'
import { SemesterWithScores } from '../../../app/Types/Semester'
import { createScoreParams, editScoreParams } from '../../../app/Types/Score'
import ScoreModel from '../../../app/Models/Score'

export default function scores() {
	Route.group(() => {
		Route.get('get-own', async ({ auth }): Promise<SemesterWithScores[] | void> => {
			const semesters = await getSemestersWithScore()
			const semesterLookup = makeLookupTable(semesters, s => s.id, true)

				; (await getUserScores(auth.user!.id))
				.forEach(score => {
					semesterLookup[score.semesterId].scores.push(score)
				})

			return semesters
		})

		Route.get('get', async ({ request, response, auth }): Promise<SemesterWithScores[] | void> => {
			const requesterRole = await RoleModel.find(auth.user!.roleId)

			if (!requesterRole || !requesterRole.seeOthersGrades)
				return response.forbidden({ error: `You can not see others scores` })

			const requestParams = request.only([ 'studentId' ])
			const studentId = parseInt(requestParams.studentId)

			if (isNaN(studentId))
				return response.badRequest({ error: `studentId must be a valid number` })

			const student = await UserModel.find(studentId)

			if (!student)
				return response.notFound({ error: `User with id \`${studentId}\` not found` })

			const studentRole = await RoleModel.find(student.roleId)

			if (!studentRole?.hasGrades)
				return response.badRequest({ error: `User with id \`${studentId}\` does not have grades` })

			const semesters = await getSemestersWithScore()
			const semesterLookup = makeLookupTable(semesters, s => s.id, true)

				; (await getUserScores(student.id))
				.forEach(score => {
					semesterLookup[score.semesterId].scores.push(score)
				})

			return semesters
		})

		Route.post('create', async ({ request, response, auth }) => {
			const role = await RoleModel.find(auth.user!.roleId)

			if (!role?.editGrades)
				return response.forbidden({ error: `You can not create scores` })

			const params = request.only(createScoreParams)

			const semesterId = params.semesterId
			const studentId = params.studentId
			const subject = params.subject
			const assessmentType = params.assessmentType
			const value = params.value

			const score = await ScoreModel.create({
				semesterId,
				studentId,
				subject,
				assessmentType,
				value,
			})

			return score.getWebFriendly()
		})

		Route.post('update', async ({ request, response, auth }) => {
			const role = await RoleModel.find(auth.user!.roleId)

			if (!role?.editGrades)
				return response.forbidden({ error: `You can not edit scores` })

			const {
				id,
				subject,
				assessmentType,
				value,
			} = request.only(editScoreParams)

			const score = await ScoreModel.find(id)

			if (!score)
				return response.notFound({ error: `Score with id \`${id}\` does not exist` })

			score.subject = subject
			score.assessmentType = assessmentType
			score.value = value

			await score.save()

			return score.getWebFriendly()
		})

		Route.delete('delete', async ({ request, response, auth }) => {
			const role = await RoleModel.find(auth.user!.roleId)

			if (!role?.editGrades)
				return response.forbidden({ error: `You can not delete scores` })

			const { id } = request.only([ "id" ])

			const score = await ScoreModel.find(id)

			if (!score)
				return response.notFound({ error: `Score with id \`${id}\` does not exist` })

			await score.delete()

			return score.getWebFriendly()
		})
	})
		.prefix('/scores')
		.middleware('authChecker')
}