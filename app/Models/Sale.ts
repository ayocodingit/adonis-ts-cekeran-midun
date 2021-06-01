import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Sale extends BaseModel {
  @column({ isPrimary: true })
  public id: bigint

  @column()
  public gross_income: bigint

  @column()
  public tax: number

  @column()
  public net_income: bigint

  @column()
  public documentId: bigint

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
