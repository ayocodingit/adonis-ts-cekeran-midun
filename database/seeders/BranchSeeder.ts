import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import branches from 'database/data/branch.json'
import Branch from 'App/Models/Branch'

export default class BranchSeederSeeder extends BaseSeeder {
  public async run () {
    await Branch.createMany(branches)
  }
}
