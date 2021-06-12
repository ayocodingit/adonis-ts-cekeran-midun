import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import branches from '../data/branch.json'
import Branch from 'App/Models/Branch'

export default class BranchSeederSeeder extends BaseSeeder {
  public async run () {
    for (const item of branches) {
      await Branch.create({
        id: BigInt(item.id),
        name: item.name,
        address: item.address,
        code: item.code
      })
    }
  }
}
