import { DateTime } from 'luxon'
import { BaseModel, column, beforeSave, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import Branch from 'App/Models/Branch'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: bigint

  @column()
  public username: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public role: string

  @column()
  public branch_id: number | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @belongsTo(() => Branch)
  public branch: BelongsTo<typeof Branch>

}
