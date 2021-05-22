import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import materials from 'database/data/material.json'
import Material from 'App/Models/Material'

export default class MaterialSeederSeeder extends BaseSeeder {
  public async run () {
    await Material.createMany(materials)
  }
}
