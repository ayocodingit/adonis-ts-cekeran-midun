import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Documents extends BaseSchema {
  protected tableName = 'documents'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id')
      table.string('reference_number').notNullable().unique()
      table.date('date')
      table.string('description')
      table.bigInteger('spending')
      table.bigInteger('sell')
      table.bigInteger('advantage')
      table.bigInteger('percentage')
      table.string('status').notNullable()
      table.bigInteger('branch_id')

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
