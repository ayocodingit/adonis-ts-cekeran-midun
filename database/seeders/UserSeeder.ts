import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import users from 'database/data/user.json'
import User from 'App/Models/User'

export default class UserSeederSeeder extends BaseSeeder {
  public async run () {
    await User.createMany(users)
  }
}
