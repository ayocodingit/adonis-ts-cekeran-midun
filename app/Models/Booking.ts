import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  belongsTo,
  BelongsTo
 } from '@ioc:Adonis/Lucid/Orm'
import Material from 'App/Models/Material'

export default class Booking extends BaseModel {
  @column({ isPrimary: true })
  public id: bigint

  @column()
  public name: string

  @column()
  public price: number

  @column()
  public qty: number

  @column()
  public unit: string | null

  @column()
  public category: string | null

  @column()
  public document_id: bigint

  @column()
  public material_id: bigint

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Material)
  public material: BelongsTo<typeof Material>

}
