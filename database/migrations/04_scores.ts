import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
	protected tableName = 'scores'

	public async up () {
		this.schema.createTable(this.tableName, (table) => {
			table.increments('id')

			table.string('subject').notNullable()
			table.string('assessment_type').notNullable()
			table.integer('value').unsigned().notNullable()

			table.integer('student_id')
				.unsigned().notNullable()
				.references('id').inTable('users')

			table.integer('semester_id')
				.unsigned().notNullable()
				.references('id').inTable('semesters')

			/**
			 * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
			 */
			table.timestamp('created_at', { useTz: true })
			table.timestamp('updated_at', { useTz: true })
		})
	}

	public async down () {
		this.schema.dropTable(this.tableName)
	}
}
