import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
	protected tableName = 'users'

	public async up() {
		this.schema.createTable(this.tableName, table => {
			table.increments('id')

			table.string('name').notNullable()
			table.string('surname').nullable()

			table.string('email').unique().nullable()
			table.string('login').unique().nullable()
			table.string('password', 255).notNullable()

			table.integer('role_id')
				.unsigned().notNullable()
				.references('id').inTable('roles')

			/**
			 * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
			 */
			table.timestamp('created_at', { useTz: true })
			table.timestamp('updated_at', { useTz: true })
		})
	}

	public async down() {
		this.schema.dropTable(this.tableName)
	}
}
