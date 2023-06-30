import ScoreModel from "../Models/Score";
import Score from "../Types/Score";

export default function getUserScores(userId: number) {
	return ScoreModel
		.query()
		.where('student_id', userId)
		.orderBy('created_at', 'asc')
		.then(scores => scores.map(score => {
			const serializableScore: Score = {
				id: score.id,
				subject: score.subject,
				assessmentType: score.assessmentType,
				value: score.value,
				studentId: score.studentId,
				semesterId: score.semesterId,
			}

			return serializableScore
		}))
}
