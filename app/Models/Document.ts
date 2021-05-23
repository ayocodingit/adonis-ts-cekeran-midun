import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  belongsTo,
  BelongsTo,
  hasMany,
  HasMany,
  hasOne,
  HasOne
} from '@ioc:Adonis/Lucid/Orm'

import Branch from 'App/Models/Branch'
import Booking from 'App/Models/Booking'
import Sale from 'App/Models/Sale'

export default class Document extends BaseModel {
  @column({ isPrimary: true })
  public id: bigint

  @column()
  public reference_number: string

  @column()
  public date: Date | null

  @column()
  public description: string | null

  @column()
  public spending: bigint | null

  @column()
  public spell: bigint | null

  @column()
  public advantage: bigint | null

  @column()
  public percentage: bigint | null

  @column()
  public status: string

  @column()
  public branch_id: bigint | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Branch)
  public branch: BelongsTo<typeof Branch>

  @hasMany(() => Booking)
  public booking: HasMany<typeof Booking>

  @hasOne(() => Sale)
  public sale: HasOne<typeof Sale>
}
