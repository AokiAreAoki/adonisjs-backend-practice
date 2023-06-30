import SemesterModel from "../Models/Semester"
import { Semester, SemesterWithScores } from "../Types/Semester"

export async function getSemesters() {
	const semesters = await SemesterModel
		.query()
		.select('*')
		.orderBy('number', 'asc')

	return semesters.map(semester => {
		const serializableSemester: Semester = {
			id: semester.id,
			year: semester.year,
			number: semester.number,
		}

		return serializableSemester
	})
}

export async function getSemestersWithScore(){
	return (await getSemesters()).map( semester => {
		const semesterWithScores: SemesterWithScores = {
			...semester,
			scores: [],
		}

		return semesterWithScores
	})
}