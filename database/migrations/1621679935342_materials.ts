import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Materials extends BaseSchema {
  protected tableName = 'materials'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id')
      table.string('name').notNullable()
      table.integer('price').notNullable()
      table.string('unit')
      table.string('category')

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
