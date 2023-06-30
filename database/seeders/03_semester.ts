import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import SemesterModel from '../../app/Models/Semester'

export default class extends BaseSeeder {
	public async run () {
		const years = 4
		const semestersInYear = 4

		for( let year = 1; year <= years; ++year)
			for( let number = 1; number <= semestersInYear; ++number)
				await SemesterModel.create({ year, number })
	}
}
